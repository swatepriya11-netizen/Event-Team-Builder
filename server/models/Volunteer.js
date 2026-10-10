const mongoose = require('mongoose');
const { makeId } = require('../lib/ids');

/**
 * A volunteer is a *person*, not a per-event record.
 *
 * The previous schema stored teamId, teamName, status, role and checkInStatus
 * directly on the volunteer. That made a volunteer permanently belong to one
 * team forever, and duplicated the team's name into every volunteer document.
 * Those five fields now live on Assignment (the per-event membership record),
 * so the same person can be on different teams at different events.
 */
const VolunteerSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => makeId('vol'),
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: { type: String, default: '' },

  // Skill ids referencing the Skill collection, so matching is exact.
  skillIds: {
    type: [{ type: String }],
    default: [],
  },

  avatarColor: { type: String, default: '#22c55e' },
  notes: { type: String, default: '' },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// People are unique by email; without this the same person could be added twice.
VolunteerSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.models.Volunteer || mongoose.model('Volunteer', VolunteerSchema);
