const mongoose = require('mongoose');
const dns = require('dns');

/** Resolvers tried only if the machine's own ones cannot answer an SRV query. */
const FALLBACK_RESOLVERS = ['8.8.8.8', '1.1.1.1'];

function resolveSrvOnce(hostname) {
  return new Promise((resolve) => {
    dns.resolveSrv(hostname, (err, records) => resolve(err ? null : records));
  });
}

/**
 * Make sure `mongodb+srv://` URIs can be resolved before mongoose tries.
 *
 * Node resolves SRV records with c-ares (its bundled resolver), not the Windows
 * one. c-ares answers EBADRESP and gives up rather than falling through to the
 * next server when a resolver returns a reply it cannot parse. On this machine
 * both configured servers are affected, so an Atlas connection dies with
 *
 *     querySrv EBADRESP _mongodb._tcp.<cluster>.mongodb.net
 *
 * even though PowerShell, the router itself, and public resolvers all return the
 * correct three records. That failure is fatal and non-retryable from the
 * driver's point of view, so it has to be handled before connecting rather than
 * after.
 *
 * Probing first means the machine's own resolvers stay in charge whenever they
 * work; a public resolver is used only as a fallback.
 */
async function ensureSrvResolves(uri) {
  if (!uri.startsWith('mongodb+srv://')) return;
  // Strip the scheme and the userinfo (everything up to the last '@'), leaving
  // "host[:port][/db][?opts]". Passwords may themselves contain '@', so anchor on
  // the last one rather than the first.
  const authority = uri.replace(/^mongodb\+srv:\/\//, '').replace(/^.*@/, '');
  const hostname = `_mongodb._tcp.${authority.split('/')[0].split(':')[0]}`;

  if (await resolveSrvOnce(hostname)) return;

  const original = dns.getServers();
  console.warn(`[MongoDB] SRV lookup for ${hostname} failed on the configured resolvers (${original.join(', ')}). Trying public resolvers.`);
  for (const server of FALLBACK_RESOLVERS) {
    try {
      dns.setServers([server]);
    } catch (err) {
      console.warn(`[MongoDB] Could not use resolver ${server}: ${err.message}`);
      continue;
    }
    if (await resolveSrvOnce(hostname)) {
      console.log(`[MongoDB] SRV lookup works via ${server}.`);
      return;
    }
  }

  // Nothing worked: restore the machine's configuration so a later retry can
  // succeed once the network changes, and let mongoose report the real failure.
  try { dns.setServers(original); } catch (_) { /* nothing more to try */ }
}

let isConnected = false;
// True once a connection has ever succeeded. Distinguishes "first connect" from
// "came back after an outage", which `isConnected` alone cannot do because the
// 'connected' event fires before connectDB() sets it.
let hasConnectedOnce = false;
let currentUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/event-team-builder';
let lastError = null;

async function connectDB(customUri = null) {
  const uriToUse = customUri || currentUri;
  const requestedUri = customUri;

  try {
    if (mongoose.connection.readyState === 1) {
      // Compare against the *previous* URI. This check must happen before
      // currentUri is reassigned, otherwise requestedUri === currentUri is
      // always true and switching clusters silently becomes a no-op.
      if (!requestedUri || requestedUri === currentUri) {
        return { success: true, message: 'Already connected to MongoDB' };
      }
      await mongoose.disconnect();
    }

    currentUri = uriToUse;
    isConnected = false;

    console.log(`[MongoDB] Connecting to: ${uriToUse.replace(/:([^:@]+)@/, ':****@')}`);

    // Must resolve before connecting: an SRV failure is fatal and is not
    // retryable by the driver, so there is nothing to catch and retry around.
    await ensureSrvResolves(uriToUse);

    // Set connection options with short timeout for quick response if offline
    await mongoose.connect(uriToUse, {
      serverSelectionTimeoutMS: 4000,
      connectTimeoutMS: 5000,
    });

    isConnected = true;
    lastError = null;
    stopRetry();
    console.log('[MongoDB] Connected successfully!');
    return { success: true, message: 'Connected to MongoDB', uri: uriToUse };
  } catch (error) {
    isConnected = false;
    lastError = error.message;
    console.warn(`[MongoDB] Connection failed: ${error.message}`);
    console.log('[MongoDB] Running in Resilient Local Mode (in-memory/file fallback). App remains 100% operational.');
    // Keep trying in the background so starting the app before the database is
    // ready does not require a manual restart.
    scheduleRetry();
    return { 
      success: false, 
      message: error.message, 
      fallback: true,
      tip: 'You can connect a MongoDB Atlas URI in the Settings page or via .env'
    };
  }
}

mongoose.connection.on('connected', () => {
  // The driver reconnects on its own after a transient outage, which moves
  // readyState back to 1. Without this handler `isConnected` stayed false and
  // every route kept using the in-memory store while reporting the database as
  // unavailable - so writes were silently discarded.
  //
  // This handler also fires on the *first* connect, because mongoose emits
  // 'connected' before connectDB() gets a chance to set isConnected. Keying the
  // "Reconnected" message off a separate everConnected flag keeps the log honest
  // - otherwise every cold start claims it reconnected to a server it never had.
  const wasDown = hasConnectedOnce && !isConnected;
  isConnected = true;
  hasConnectedOnce = true;
  lastError = null;
  if (wasDown) {
    console.log('[MongoDB] Reconnected');
    // Refresh the fallback mirror. While we were away the database may have
    // changed (another instance, a manual edit), so a later fallback must not
    // serve stale data.
    require('../lib/sync')
      .syncMirror()
      .then(() => console.log('[MongoDB] Fallback store re-synced after reconnect'))
      .catch((err) => console.warn('[MongoDB] Re-sync after reconnect failed:', err.message));
  }
});

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.log('[MongoDB] Disconnected');
});

mongoose.connection.on('error', (err) => {
  isConnected = false;
  lastError = err.message;
  console.warn('[MongoDB] Connection error:', err.message);
});

// If the very first attempt failed there is no existing driver connection for it
// to recover, so nothing would ever retry. Without this the app would sit in
// fallback mode forever after being started before the database was ready.
let retryTimer = null;

function stopRetry() {
  if (retryTimer) clearInterval(retryTimer);
  retryTimer = null;
}

function scheduleRetry() {
  if (retryTimer || isConnected) return;
  retryTimer = setInterval(async () => {
    if (isConnected) return stopRetry();
    const result = await connectDB();
    if (result.success) {
      stopRetry();
      try {
        await require('../lib/sync').syncMirror();
        console.log('[Boot] Fallback store synced from MongoDB');
      } catch (err) {
        console.warn('[Boot] Fallback sync after retry failed:', err.message);
      }
    }
  }, 15000);
  retryTimer.unref();
}

function getDBStatus() {
  const stateMap = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  const stateIndex = mongoose.connection.readyState;
  // Derived, never cached: a stale flag here would make the app call a healthy
  // database unusable (or the reverse).
  const connected = isConnected && stateIndex === 1;
  return {
    connected,
    state: stateMap[stateIndex] || 'unknown',
    uri: currentUri ? currentUri.replace(/:([^:@]+)@/, ':****@') : '',
    lastError,
    mode: connected ? 'mongodb' : 'fallback-local',
    // True while the app is actively trying to get back to the database.
    retrying: Boolean(retryTimer),
  };
}

module.exports = {
  connectDB,
  getDBStatus,
  scheduleRetry,
  stopRetry,
  mongoose,
};
