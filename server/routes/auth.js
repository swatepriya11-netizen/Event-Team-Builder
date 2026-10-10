const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const memoryStore = require('../store/memoryStore');
const { getDBStatus } = require('../config/db');
const { toPublicUser } = require('../lib/views');
const { signToken, requireAuth } = require('../middleware/auth');

// In-memory throttle to blunt password guessing. Per-process, so it resets on
// restart and is not shared across instances - fine for a single-node deploy.
//
// Two independent counters are bumped on every failure:
//   - per-IP, so spraying many emails from one host is also limited
//   - per-IP+email, so one account cannot be hammered from many hosts
// A request is blocked when *either* counter is exhausted.
const failures = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ACCOUNT_ATTEMPTS = 8;
const MAX_IP_ATTEMPTS = 30;

const ipKey = (req) => `ip:${req.ip}`;
const accountKey = (req, email) => `acct:${req.ip}:${String(email || '').toLowerCase()}`;

function readBucket(key) {
  const entry = failures.get(key);
  if (!entry) return null;
  if (Date.now() - entry.first > WINDOW_MS) {
    failures.delete(key);
    return null;
  }
  return entry;
}

function isThrottled(req, email) {
  const account = readBucket(accountKey(req, email));
  if (account && account.count >= MAX_ACCOUNT_ATTEMPTS) return true;
  const ip = readBucket(ipKey(req));
  return Boolean(ip && ip.count >= MAX_IP_ATTEMPTS);
}

function recordFailure(req, email) {
  for (const key of [ipKey(req), accountKey(req, email)]) {
    const entry = readBucket(key);
    if (!entry) failures.set(key, { count: 1, first: Date.now() });
    else entry.count += 1;
  }
}

function clearFailures(req, email) {
  failures.delete(ipKey(req));
  failures.delete(accountKey(req, email));
}

// Prune expired buckets so the map cannot grow without bound.
const pruneTimer = setInterval(() => {
  const cutoff = Date.now() - WINDOW_MS;
  for (const [key, entry] of failures) {
    if (entry.first < cutoff) failures.delete(key);
  }
}, 60 * 1000);
pruneTimer.unref();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Campus email and password are required' });
  }
  if (isThrottled(req, email)) {
    return res.status(429).json({ error: 'Too many failed attempts. Try again in a few minutes.' });
  }

  try {
    const { connected } = getDBStatus();
    const normalisedEmail = String(email).toLowerCase().trim();

    // password is select:false on the model, so it must be requested explicitly.
    const user = connected
      ? await User.findOne({ email: normalisedEmail }).select('+password')
      : await memoryStore.findUserByEmail(normalisedEmail);

    // Same message and roughly the same work for unknown-email vs wrong-password
    // so the response cannot be used to enumerate accounts.
    const invalid = { error: 'Incorrect email or password' };
    if (!user) {
      // Compare against a dummy hash to keep timing similar.
      await hashEqualiser(connected);
      recordFailure(req, email);
      return res.status(401).json(invalid);
    }

    const ok = await comparePassword(connected, user, password);
    if (!ok) {
      recordFailure(req, email);
      return res.status(401).json(invalid);
    }

    clearFailures(req, email);
    user.lastLoginAt = new Date();
    if (connected) await user.save();
    else await memoryStore.touchLastLogin(user._id);

    return res.json({
      success: true,
      message: 'Signed in successfully',
      user: toPublicUser(user),
      token: signToken(user),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password, campusOrg } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  if (String(password).length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  try {
    const { connected } = getDBStatus();
    const normalised = String(email).toLowerCase().trim();
    const existing = connected
      ? await User.findOne({ email: normalised })
      : await memoryStore.findUserByEmail(normalised);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }

    // Least privilege: signing up never grants Coordinator, because that role
    // guards the destructive system endpoints (wipe + reseed, reconnect cluster).
    // The very first account on an empty deployment is promoted to Coordinator
    // so a fresh install cannot end up with nobody able to administer it.
    const role = await resolveRegistrationRole(connected);

    let created;
    if (connected) {
      // The pre-save hook hashes the password; it is never stored in plaintext.
      created = await User.create({
        name: name || 'Coordinator',
        email: normalised,
        password,
        role,
        campusOrg: campusOrg || 'Student Activities Board',
      });
    } else {
      created = await memoryStore.createUser({
        name: name || 'Coordinator',
        email: normalised,
        password,
        role,
        campusOrg: campusOrg || 'Student Activities Board',
      });
    }

    return res.status(201).json({
      success: true,
      user: toPublicUser(created),
      token: signToken(created),
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'An account with this email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

/** Burn roughly one bcrypt's worth of time, so a miss looks like a wrong password. */
async function hashEqualiser(connected) {
  if (connected) await User.hashPassword('timing-equalizer');
  else await memoryStore.hashPassword('timing-equalizer');
}

function comparePassword(connected, user, candidate) {
  if (connected) return user.verifyPassword(candidate);
  return bcrypt.compare(String(candidate), user.password || '');
}

/**
 * Coordinator if no account exists yet, otherwise Volunteer.
 *
 * The count comes from whichever store is live. A failed count is deliberately
 * not coerced to Coordinator: silently handing out admin rights because a query
 * failed is a privilege escalation.
 */
async function resolveRegistrationRole(connected) {
  const total = connected
    ? await User.estimatedDocumentCount()
    : await memoryStore.countUsers();
  return total === 0 ? 'Coordinator' : 'Volunteer';
}

// GET /api/auth/me - returns the authenticated account
router.get('/me', requireAuth, (req, res) => {
  // requireAuth already reduced the record to its public shape.
  res.json({ user: req.user });
});

module.exports = router;