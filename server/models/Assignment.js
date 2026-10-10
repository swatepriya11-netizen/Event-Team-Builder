const mongoose = require('mongoose');
const { makeId } = require('../lib/ids');

/**
 * Assignment = the link between a volunteer and an event, and optionally a team.
 *
 * This is the collection that makes the rest of the schema work. It replaces
 * the duplicated fields that used to sit on Volunteer and Task:
 *
 *   Volunteer.teamId / teamName / status / role / checkInStatus  ->  here
 *   Task.assigneeNames / assignedCrewCount                      ->  Task.assignees
 *
 * Because a volunteer only has ONE assignment per event, "which team is this
 * person on for this event?" has exactly one answer, and the team name is never
 * stored twice.
 */
const AssignmentSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => makeId('asg'),
  },

  eventId: {
    type: String,
    ref: 'Event',
    required: true,
  },
  volunteerId: {
    type: String,
    ref: 'Volunteer',
    required: true,
  },

  // null means "signed up for this event but not yet placed on a team", which
  // is exactly the pool the matching engine recommends from.
  teamId: {
    type: String,
    ref: 'Team',
    default: null,
  },

  role: { type: String, default: 'General Crew' },

  // Distinct from the read model's "Ready"/"Assigned" label, which is derived
  // from whether teamId is set. This is the enrolment state.
  enrollmentStatus: {
    type: String,
    enum: ['Invited', 'Confirmed', 'CheckedIn', 'Withdrawn'],
    default: 'Confirmed',
  },

  // Coarse availability buckets, matching what the UI has always offered.
  availability: {
    type: [{ type: String }],
    default: ['Morning'],
  },

  checkedInAt: { type: Date, default: null },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// One assignment per volunteer per event. This is what makes teamId on the
// volunteer unambiguous, and it is enforced by the database, not by convention.
AssignmentSchema.index({ eventId: 1, volunteerId: 1 }, { unique: true });

// Roster lookups: everyone on a given team for a given event.
AssignmentSchema.index({ eventId: 1, teamId: 1 });

module.exports = mongoose.models.Assignment || mongoose.model('Assignment', AssignmentSchema);
