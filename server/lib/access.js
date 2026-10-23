const Volunteer = require('../models/Volunteer');
const Assignment = require('../models/Assignment');
const { getDBStatus } = require('../config/db');
const memoryStore = require('../store/memoryStore');

/**
 * Role-based access rules.
 *
 * A Coordinator sees the whole event. Everyone else is treated as a volunteer
 * and can only see the parts of the event they are actually part of:
 *
 *   - the events they have an Assignment in
 *   - their own profile and the people on their team
 *   - their team and its tasks
 *
 * They can edit only their own phone/availability/check-in and the status of a
 * task they are personally assigned to. Everything else is Coordinator-only and
 * is enforced here rather than in the UI, so a direct API call cannot bypass it.
 */

function isCoordinator(user) {
  return Boolean(user && user.role === 'Coordinator');
}

/**
 * Resolve the Volunteer document behind an account.
 *
 * `User.volunteerId` is the primary link. Falling back to the email address
 * means an account still connects if the coordinator created the volunteer
 * after the person signed up (or if the link was never persisted).
 */
async function resolveVolunteerId(user) {
  if (!user) return null;
  if (user.volunteerId) return String(user.volunteerId);

  const email = String(user.email || '').toLowerCase().trim();
  if (!email) return null;

  const { connected } = getDBStatus();
  if (connected) {
    const volunteer = await Volunteer.findOne({ email }).select('_id').lean();
    return volunteer ? String(volunteer._id) : null;
  }
  return memoryStore.findVolunteerByEmail(email)?._id || null;
}

/** The assignment for one person in one event, or null if they are not enrolled. */
async function getEventAssignment(eventId, volunteerId) {
  if (!eventId || !volunteerId) return null;
  const { connected } = getDBStatus();
  if (connected) {
    return Assignment.findOne({ eventId, volunteerId }).lean();
  }
  return (
    memoryStore.getAssignments(eventId).find((a) => a.volunteerId === volunteerId) || null
  );
}

/** Every event id this person is enrolled in, in either store. */
async function listEnrolledEventIds(volunteerId) {
  if (!volunteerId) return [];
  const { connected } = getDBStatus();
  if (connected) {
    return Assignment.distinct('eventId', { volunteerId });
  }
  return [
    ...new Set(
      memoryStore.assignments
        .filter((a) => a.volunteerId === volunteerId)
        .map((a) => a.eventId)
    ),
  ];
}

/**
 * True when the account may read the given event. Coordinators may read every
 * event; volunteers only those they are enrolled in.
 */
async function canAccessEvent(user, eventId) {
  if (isCoordinator(user)) return true;
  const volunteerId = await resolveVolunteerId(user);
  if (!volunteerId) return false;
  return Boolean(await getEventAssignment(eventId, volunteerId));
}

/**
 * Scope a set of task read-models to what this account is allowed to see.
 * Coordinators keep everything. Volunteers get tasks assigned to them and the
 * tasks belonging to their team.
 */
async function scopeTasks(user, eventId, tasks) {
  if (isCoordinator(user)) return tasks;

  const volunteerId = await resolveVolunteerId(user);
  if (!volunteerId) return [];

  const assignment = await getEventAssignment(eventId, volunteerId);
  const teamId = assignment?.teamId || null;

  return tasks.filter(
    (task) =>
      (task.assignees || []).map(String).includes(String(volunteerId)) ||
      (teamId && String(task.teamId) === String(teamId))
  );
}

module.exports = {
  isCoordinator,
  resolveVolunteerId,
  getEventAssignment,
  listEnrolledEventIds,
  canAccessEvent,
  scopeTasks,
};
