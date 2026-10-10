const User = require('../models/User');
const { initialUsers } = require('./seedData');

/**
 * Guarantee the demo coordinator account exists so a freshly-seeded or empty
 * database is never left with no way to sign in. Idempotent: existing accounts
 * are left untouched.
 *
 * @returns {Promise<{user: object, created: boolean}>}
 */
async function ensureDemoCoordinator() {
  const results = [];

  for (const seed of initialUsers) {
    const existing = await User.findOne({ email: seed.email });
    if (existing) {
      results.push({ user: existing, created: false });
      continue;
    }
    // User.create() triggers the pre-save hook -> bcrypt hash.
    const user = await User.create(seed);
    results.push({ user, created: true });
  }

  return results[0];
}

module.exports = { ensureDemoCoordinator };