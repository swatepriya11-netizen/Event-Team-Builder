const jwt = require('jsonwebtoken');
const User = require('../models/User');
const memoryStore = require('../store/memoryStore');
const { getDBStatus } = require('../config/db');
const { toPublicUser } = require('../lib/views');

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

let cachedSecret = null;

/**
 * Resolve the signing secret. A secret supplied via the environment is always
 * required in production; in development we fall back to an ephemeral random
 * secret so the app still runs, at the cost of invalidating sessions on restart.
 */
function getSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_SECRET must be set in production');
  }
  if (!cachedSecret) {
    cachedSecret = require('crypto').randomBytes(48).toString('hex');
    console.warn('[Auth] JWT_SECRET not set - using an ephemeral dev secret. Sessions reset on restart.');
  }
  return cachedSecret;
}

function signToken(user) {
  return jwt.sign(
    { sub: user._id, email: user.email, role: user.role },
    getSecret(),
    { expiresIn: JWT_EXPIRES_IN }
  );
}

function extractToken(req) {
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) return header.slice(7).trim();
  return null;
}

/**
 * Look the account behind a verified token.
 *
 * Falls back to the in-memory mirror when MongoDB is unreachable. Without that
 * branch every authenticated route would 500 during a database outage, taking
 * the whole app down rather than degrading it.
 */
async function findAccount(id) {
  const { connected } = getDBStatus();
  return connected ? User.findById(id) : memoryStore.findUserById(id);
}

/** Reject the request unless it carries a valid, unexpired bearer token. */
async function requireAuth(req, res, next) {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const payload = jwt.verify(token, getSecret());
    const user = await findAccount(payload.sub);
    if (!user) {
      return res.status(401).json({ error: 'Account no longer exists' });
    }
    // A plain object from the fallback store has no toPublicJSON(); normalise
    // so downstream code can rely on one shape.
    req.user = toPublicUser(user);
    req.token = token;
    next();
  } catch (err) {
    const message =
      err.name === 'TokenExpiredError' ? 'Session expired, please sign in again' : 'Invalid session token';
    return res.status(401).json({ error: message });
  }
}

/** Must run after requireAuth. Restricts a route to the given roles. */
function requireRole(...roles) {
  return function roleGuard(req, res, next) {
    if (!req.user) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: `This action requires one of: ${roles.join(', ')}`,
      });
    }
    next();
  };
}

module.exports = { signToken, requireAuth, requireRole, JWT_EXPIRES_IN };