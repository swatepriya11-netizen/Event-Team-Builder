const { formatDateRange, formatShift } = require('./ids');

/**
 * Read models.
 *
 * Storage is normalised (teams, volunteers, assignments and tasks reference each
 * other by id). The UI, however, expects each volunteer to carry a teamName and
 * each task to carry a list of assignee *names*.
 *
 * Rather than duplicating those values on write - which is what made the old
 * schema drift - they are computed here at read time. These builders work on
 * plain objects so the identical code serves both MongoDB and the in-memory
 * fallback store.
 */

function indexBy(items, key = '_id') {
  const map = new Map();
  for (const item of items) map.set(String(item[key]), item);
  return map;
}

/**
 * Attach team and enrolment fields to volunteers.
 *
 * `assignments` is the list of Assignment docs for this event. The returned
 * shape is deliberately the one the existing components already consume
 * (teamId, teamName, status, role, checkInStatus, availability, skills), so no
 * page had to be rewritten - but every field is now derived, not stored.
 */
function buildVolunteerViews(volunteers, assignments, { skills = [], teams = [] } = {}) {
  const skillById = indexBy(skills);
  const teamById = indexBy(teams);
  const assignmentByVolunteer = new Map();
  for (const a of assignments) {
    assignmentByVolunteer.set(String(a.volunteerId), a);
  }

  return volunteers.map((vol) => {
    const assignment = assignmentByVolunteer.get(String(vol._id));
    const team = assignment && assignment.teamId ? teamById.get(String(assignment.teamId)) : null;

    return {
      ...vol,
      // Skill ids are canonical; the UI wants display names.
      skillIds: vol.skillIds || [],
      skills: (vol.skillIds || []).map((id) => skillById.get(String(id))?.name || id),

      // Derived from the assignment, never stored on the volunteer.
      teamId: team ? team._id : null,
      teamName: team ? team.name : 'Unassigned',
      status: team ? 'Assigned' : 'Ready',
      role: assignment?.role || 'General Crew',
      availability: assignment?.availability?.length ? assignment.availability : ['Morning'],
      checkInStatus: Boolean(assignment?.checkedInAt),
      assignmentId: assignment?._id || null,
      enrollmentStatus: assignment?.enrollmentStatus || 'Confirmed',
    };
  });
}

/** Attach resolved assignee names and crew counts to tasks. */
function buildTaskViews(tasks, { volunteers = [], teams = [] } = {}) {
  const volunteerById = indexBy(volunteers);
  const teamById = indexBy(teams);

  return tasks.map((task) => {
    const team = task.teamId ? teamById.get(String(task.teamId)) : null;
    const assignees = task.assignees || [];
    const names = assignees
      .map((id) => volunteerById.get(String(id))?.name)
      .filter(Boolean);

    return {
      ...task,
      // Derived from the assignees array - previously a hand-maintained
      // integer that drifted away from the real roster.
      assignedCrewCount: assignees.length,
      assigneeNames: names,
      teamName: team ? team.name : 'General Operations',

      // Display helpers so the existing date UI keeps working unchanged.
      shiftTime: formatShift(task.shiftStart, task.shiftEnd) || 'Unscheduled',
      shiftDate: task.shiftStart
        ? new Date(task.shiftStart).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })
        : '',
    };
  });
}

/** Attach computed roster size, lead name and skill labels to teams. */
function buildTeamViews(teams, { assignments = [], volunteers = [], skills = [] } = {}) {
  const volunteerById = indexBy(volunteers);
  const skillById = indexBy(skills);

  const counts = new Map();
  for (const a of assignments) {
    if (!a.teamId) continue;
    const key = String(a.teamId);
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return teams.map((team) => ({
    ...team,
    // Computed from assignments every read, so it cannot go stale.
    assignedCount: counts.get(String(team._id)) || 0,
    leadName: team.leadVolunteerId
      ? volunteerById.get(String(team.leadVolunteerId))?.name || 'Unassigned'
      : 'Unassigned',
    // Skill ids are canonical; the UI wants names.
    requiredSkills: (team.requiredSkillIds || []).map((id) => skillById.get(String(id))?.name || id),
  }));
}

/** Shape an Event for the client, adding the derived display fields. */
function buildEventView(event, extra = {}) {
  if (!event) return null;
  return {
    ...event,
    dates: formatDateRange(event.startsAt, event.endsAt),
    shiftAlerts: `Sent ${Math.round((event.settings?.shiftAlertLeadMinutes ?? 120) / 60)}h before`,
    autoMatching: event.settings?.autoMatching ?? true,
    coordinatorEditing: event.settings?.coordinatorEditing ?? true,
    activeVolunteersTarget: event.targets?.activeVolunteers ?? 45,
    ...extra,
  };
}

/**
 * Shape an account for the client.
 *
 * Accepts either a Mongoose document or a plain object from the fallback store,
 * so both backends produce an identical response. The password hash is
 * deliberately never included.
 */
function toPublicUser(user) {
  if (!user) return null;
  return {
    id: String(user._id ?? user.id),
    name: user.name,
    email: user.email,
    role: user.role,
    campusOrg: user.campusOrg,
    volunteerId: user.volunteerId ? String(user.volunteerId) : null,
  };
}

module.exports = {
  buildVolunteerViews,
  buildTaskViews,
  buildTeamViews,
  buildEventView,
  toPublicUser,
  indexBy,
};
