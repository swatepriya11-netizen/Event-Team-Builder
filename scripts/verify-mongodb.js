/**
 * Verify the MongoDB connection in .env is usable by this app.
 *
 *   node scripts/verify-mongodb.js
 *
 * Reads MONGODB_URI from .env (so the password is never written to a second
 * file or printed), then reports what the server actually offers: deployment
 * type, the collections and indexes that exist, and whether the app's required
 * collections are all present.
 *
 * Exits 0 if the app can use the database, 1 otherwise.
 */
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const { MongoClient } = require('mongodb');

const DB_NAME = 'event-team-builder';

/**
 * Collections the app depends on, mapped to the indexes its models declare.
 * These are transcribed from server/models/*.js - `unique: true` is either a
 * field-level flag (Event.slug) or an option on Schema.index().
 *
 * `skills` intentionally has no secondary index: Skill._id *is* the slugified
 * name, so lookups by name are already covered by the _id index.
 */
const REQUIRED = {
  events: { slug_1: true, isActive_1: false },
  skills: {},
  volunteers: { email_1: true },
  teams: { eventId_1_code_1: true, eventId_1: false },
  assignments: { eventId_1_volunteerId_1: true, eventId_1_teamId_1: false },
  tasks: { eventId_1_shiftStart_1: false, eventId_1_teamId_1_status_1: false },
  users: { email_1: true },
};

const COLLECTIONS = Object.keys(REQUIRED);

/** Hide the password while keeping host/database visible for troubleshooting. */
function redact(uri) {
  return String(uri || '').replace(/^(mongodb(?:\+srv)?:\/\/)([^:@/]+):([^@/]+)@/, '$1$2:****@');
}

/** Human-readable host, without credentials. */
function hostOf(uri) {
  const m = /^mongodb(?:\+srv)?:\/\/(?:[^@/]*@)?([^/?]+)/.exec(String(uri || ''));
  return m ? m[1] : '(unparsed)';
}

function rule(title) {
  console.log(`\n${'='.repeat(64)}\n${title}\n${'='.repeat(64)}`);
}

async function main() {
  const uri = process.env.MONGODB_URI;

  rule('1. Connection target');
  if (!uri) {
    console.log('  MONGODB_URI is not set in .env - the app will run in fallback mode.');
    process.exitCode = 1;
    return;
  }
  console.log(`  uri  : ${redact(uri)}`);
  console.log(`  host : ${hostOf(uri)}`);
  console.log(`  mode : ${uri.includes('+srv') ? 'SRV (DNS-discovered, needs port 27017)' : 'seed list'}`);

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 15000,
    connectTimeoutMS: 10000,
    serverApi: undefined,
  });

  rule('2. Authentication + handshake');
  try {
    const t0 = Date.now();
    await client.connect();
    console.log(`  connected in ${Date.now() - t0}ms`);

    const hello = await client.db('admin').command({ hello: 1 });
    console.log(`  isWritablePrim : ${hello.isWritablePrimary}`);
    // `setName`/`me` are only populated on replica sets and sharded clusters.
    // An empty setName on a standalone mongod is expected, not a fault.
    console.log(`  topology       : ${hello.setName ? `sharded/replset "${hello.setName}"` : 'standalone'}`);
    if (hello.me) console.log(`  me             : ${hello.me}`);
    console.log(`  wire version   : ${hello.minWireVersion}-${hello.maxWireVersion}`);
    // Version lives in buildInfo; `hello` does not return it.
    try {
      const bi = await client.db('admin').command({ buildInfo: 1 });
      console.log(`  server version : MongoDB ${bi.version}`);
    } catch (_) {
      console.log('  server version : (not readable without higher privileges)');
    }
    if (hello.msg) console.log(`  msg            : ${hello.msg}`);
  } catch (err) {
    console.log(`  FAILED: ${err.name}: ${err.message}`);
    console.log('');
    console.log('  Most likely causes, in order:');
    if (/Authentication failed|not authorized/i.test(err.message)) {
      console.log('    - wrong username or password in MONGODB_URI');
      console.log('    - password contains a character that must be percent-encoded, e.g.');
      console.log('        @  -> %40     :  -> %3A     /  -> %2F');
      console.log('        ?  -> %3F     #  -> %23    [  -> %5B     ]  -> %5D');
      console.log('        %  -> %25     $  -> %24');
      console.log('    - on Atlas: username is the *Database Access* user, not your login email');
      console.log('    - on Atlas: confirm the user still exists (Database Access) and has not expired');
    } else if (/timed out|server selection/i.test(err.message)) {
      console.log('    - network: this machine cannot reach the cluster (IP Access List, firewall, proxy)');
      console.log('    - add your public IP to Atlas > Network Access');
    } else {
      console.log('    - see the message above');
    }
    await client.close().catch(() => {});
    process.exitCode = 1;
    return;
  }

  rule('3. Privilege check (what this user can actually do)');
  try {
    const info = await client.db('admin').command({ connectionStatus: 1 });
    const authInfo = info.authInfo || {};
    // `authenticatedUsers` is an array of {user, db, roles} objects, and
    // `authenticatedUserRoles` is a flat array of {role, db} - iterating either
    // as a plain object throws. Use the flat one.
    const roles = authInfo.authenticatedUserRoles || [];
    const users = authInfo.authenticatedUsers || [];

    if (!roles.length) {
      console.log('  no authenticated-user info (server runs without auth)');
    } else {
      const who = users.map((u) => `${u.user}@${u.db}`).join(', ');
      if (who) console.log(`  authenticated as : ${who}`);
      console.log(`  roles            : ${roles.map((r) => `${r.role} on ${r.db}`).join(', ')}`);
      // readWriteAnyDatabase is what the app actually needs; anything broader
      // is worth flagging so a production deploy does not run on an admin user.
      const broad = roles.some((r) => /AnyDatabase|atlasAdmin|root/.test(r.role));
      if (broad) {
        console.log('');
        console.log('  NOTE: this user holds broad/admin privileges. The app only needs');
        console.log('        readWriteAnyDatabase. Consider a dedicated, least-privilege');
        console.log('        database user for anything beyond local development.');
      }
    }
  } catch (err) {
    console.log(`  could not read connectionStatus: ${err.message}`);
  }

  rule('4. Databases visible to this user');
  try {
    const dbs = await client.db('admin').command({ listDatabases: 1, nameOnly: true, authorizedDatabases: true });
    const names = dbs.databases.map((d) => d.name);
    console.log(`  ${names.length ? names.join(', ') : '(none)'}`);
    console.log(`  target database "${DB_NAME}" exists: ${names.includes(DB_NAME) ? 'yes' : 'no (it will be created on first write)'}`);
  } catch (err) {
    console.log(`  listDatabases not permitted: ${err.message}`);
    console.log(`  (fine - "${DB_NAME}" can still be created on first write if the user has write access to it)`);
  }

  const db = client.db(DB_NAME);

  rule('5. Existing collections + document counts');
  let existing = [];
  try {
    // The native helper unwraps the command's cursor; reading the raw command
    // result would hand back { cursor: { firstBatch: [...] } } instead.
    const cols = await db.listCollections({}, { nameOnly: true }).toArray();
    existing = cols.map((c) => c.name).sort();
  } catch (err) {
    console.log(`  could not list collections: ${err.message}`);
  }

  if (!existing.length) {
    console.log('  (database is empty - run `npm run seed` to create the demo dataset)');
  } else {
    for (const name of existing) {
      let count = '?';
      try {
        count = await db.collection(name).estimatedDocumentCount();
      } catch (_) { /* ignore */ }
      console.log(`  ${name.padEnd(14)} ${count} doc(s)`);
    }
    const extras = existing.filter((n) => !COLLECTIONS.includes(n));
    if (extras.length) console.log(`  (extra collections not used by the app: ${extras.join(', ')})`);
  }

  rule('6. Required collections');
  let missingCollections = 0;
  for (const name of COLLECTIONS) {
    if (existing.includes(name)) {
      console.log(`  [ok]      ${name}`);
    } else {
      console.log(`  [missing] ${name}`);
      missingCollections += 1;
    }
  }

  rule('7. Indexes on required collections');
  // Models create their indexes automatically when mongoose connects, so a
  // missing index here is expected before the first run.
  let totalMissing = 0;
  for (const name of COLLECTIONS) {
    const wanted = REQUIRED[name];
    if (!existing.includes(name)) continue;

    let idx = [];
    try {
      idx = await db.collection(name).indexes();
    } catch (err) {
      console.log(`  ${name.padEnd(13)} could not read indexes - ${err.message}`);
      continue;
    }

    const byName = new Map(idx.map((i) => [i.name, i]));
    const want = Object.keys(wanted);
    const absent = want.filter((w) => !byName.has(w));
    // A wrong `unique` flag is as broken as a missing index: duplicate slugs or
    // emails would be allowed, which is the whole point of these indexes.
    const notUnique = want.filter((w) => wanted[w] && byName.has(w) && !byName.get(w).unique);
    totalMissing += absent.length + notUnique.length;

    // The built-in index is literally named "_id_" (with a trailing underscore).
    const others = idx
      .map((i) => i.name)
      .filter((n) => n !== '_id_' && !want.includes(n));

    if (!want.length && !others.length) {
      console.log(`  ${name.padEnd(13)} [ok]      no secondary indexes needed`);
    } else {
      const bad = absent.length + notUnique.length;
      const flag = bad ? 'incomplete' : 'ok      ';
      console.log(`  ${name.padEnd(13)} [${flag}] ${want.join(', ') || '(none)'}`);
      if (absent.length) console.log(`  ${''.padEnd(13)}   missing      : ${absent.join(', ')}`);
      if (notUnique.length) console.log(`  ${''.padEnd(13)}   not unique   : ${notUnique.join(', ')} (must be unique)`);
      if (others.length) console.log(`  ${''.padEnd(13)}   extra        : ${others.join(', ')}`);
    }
  }

  rule('Result');
  if (missingCollections === 0 && totalMissing === 0) {
    console.log('  PASS - the app can use this database as-is.');
    console.log('  Restart the API (npm run dev) so it picks up the new MONGODB_URI.');
  } else {
    console.log('  Connection works, but the schema is not fully in place yet.');
    console.log(`  ${missingCollections} collection(s) and ${totalMissing} index(es) missing.`);
    console.log('  Start the API once (npm run dev); mongoose builds indexes on connect,');
    console.log('  then `npm run seed` fills the demo data.');
  }
  console.log(`  app will report mode: ${existing.length ? 'mongodb' : 'mongodb (after seed)'}`);

  await client.close().catch(() => {});
}

main().catch((err) => {
  console.error('Unexpected failure:', err);
  process.exitCode = 1;
});
