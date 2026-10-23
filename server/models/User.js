const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 12;

const UserSchema = new mongoose.Schema({
  // String _id for consistency with Team/Volunteer/Task.
  _id: {
    type: String,
    default: () => `usr-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    // Never returned by a plain find()/findOne() unless explicitly selected.
    select: false,
  },
  role: {
    type: String,
    enum: ['Coordinator', 'Lead', 'Volunteer'],
    default: 'Coordinator',
  },
  // Links a signed-in Volunteer account to their person record in the volunteer
  // directory. Resolved by email at sign-in when it is not already set, so an
  // account created before the coordinator added the volunteer still connects.
  volunteerId: {
    type: String,
    ref: 'Volunteer',
    default: null,
  },
  campusOrg: {
    type: String,
    default: 'Student Cultural Board',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLoginAt: {
    type: Date,
    default: null,
  },
});

// Hash on create and on any password change, so no code path can persist a
// plaintext password by accident.
UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.verifyPassword = function verifyPassword(candidate) {
  if (!this.password) return Promise.resolve(false);
  return bcrypt.compare(String(candidate), this.password);
};

// NOTE: the shape returned to the client lives in lib/views.js as toPublicUser(),
// which also accepts the plain objects the in-memory fallback store returns.
// Defining it here as well would give the same concept two implementations that
// could drift apart.

UserSchema.statics.hashPassword = function hashPassword(plain) {
  return bcrypt.hash(String(plain), SALT_ROUNDS);
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);