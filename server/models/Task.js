const mongoose = require('mongoose');
const { makeId } = require('../lib/ids');

const TaskSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => makeId('task'),
  },

  // Scopes the task to an event.
  eventId: {
    type: String,
    ref: 'Event',
    required: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: { type: String, default: '' },

  // Real Date range. Replaces the "shiftDate: '19 September 2026'" and
  // "shiftTime: '09:30 - Shift 1'" strings, which could not be sorted
  // chronologically or filtered by date.
  shiftStart: { type: Date, required: true },
  shiftEnd: { type: Date, default: null },

  priority: {
    type: String,
    enum: ['High', 'Medium', 'Low'],
    default: 'Medium',
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },

  teamId: {
    type: String,
    ref: 'Team',
    default: null,
  },

  requiredCrew: { type: Number, default: 4 },

  // Volunteer ids, not names. The previous assigneeNames array held plain
  // strings that nothing kept in sync, so renaming a volunteer silently left
  // stale names on every task they were assigned to.
  assignees: {
    type: [{ type: String }],
    default: [],
  },

  location: { type: String, default: 'Main Stage' },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Chronological ordering across an event's schedule.
TaskSchema.index({ eventId: 1, shiftStart: 1 });

// "Show me this team's open work".
TaskSchema.index({ eventId: 1, teamId: 1, status: 1 });

module.exports = mongoose.models.Task || mongoose.model('Task', TaskSchema);
