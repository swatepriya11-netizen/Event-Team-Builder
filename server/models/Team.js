const mongoose = require('mongoose');
const { makeId } = require('../lib/ids');

const TeamSchema = new mongoose.Schema({
  // String _id so seed ids ("team-stage-ops") survive insertion without Mongoose
  // trying to cast them to ObjectId and throwing.
  _id: {
    type: String,
    default: () => makeId('team'),
  },

  // Every team belongs to exactly one event. This is the field that makes
  // multiple events possible.
  eventId: {
    type: String,
    ref: 'Event',
    required: true,
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  // Unique per event, not globally: two events can both have a "stage-ops" team.
  code: {
    type: String,
    required: true,
    trim: true,
  },

  description: { type: String, default: '' },
  color: { type: String, default: '#22c55e' },

  // Was leadName: String. Now an actual reference, so renaming a volunteer
  // updates every team that person leads.
  leadVolunteerId: {
    type: String,
    ref: 'Volunteer',
    default: null,
  },

  // Skill ids, not display strings. The matching engine compares these directly.
  requiredSkillIds: {
    type: [{ type: String }],
    default: [],
  },

  targetCapacity: { type: Number, default: 10 },
  notes: { type: String, default: '' },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// A team's code only has to be unique within its event.
TeamSchema.index({ eventId: 1, code: 1 }, { unique: true });
TeamSchema.index({ eventId: 1 });

module.exports = mongoose.models.Team || mongoose.model('Team', TeamSchema);
