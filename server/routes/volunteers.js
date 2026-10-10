const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');
const Team = require('../models/Team');
const Assignment = require('../models/Assignment');
const Skill = require('../models/Skill');
// Needed on delete: a removed volunteer must also come off every task roster
// in that event.
const Task = require('../models/Task');
const memoryStore = require('../store/memoryStore');
const { getDBStatus } = require('../config/db');
const { requireEventId } = require('../lib/eventScope');
const { buildVolunteerViews } = require('../lib/views');
const { slugify } = require('../lib/ids');

// Load the normalised records needed to build volunteer read-models.
async function loadVolunteerContext(eventId, connected) {
  if (connected) {
    const [assignments, teams, skills] = await Promise.all([
      Assignment.find({ eventId }).lean(),
      Team.find({ eventId }).lean(),
      Skill.find({}).lean(),
    ]);
    // Volunteers are global people; take the ones enrolled in this event.
    const ids = [...new Set(assignments.map((a) => a.volunteerId))];
    const volunteers = ids.length ? await Volunteer.find({ _id: { $in: ids } }).lean() : [];
    return { volunteers, assignments, teams, skills };
  }
  return {
    volunteers: memoryStore.getVolunteers(eventId),
    assignments: memoryStore.getAssignments(eventId),
    teams: memoryStore.getTeams(eventId),
    skills: memoryStore.getSkills(),
  };
}

/** Escape a user-supplied search term before it reaches $regex. */
function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Accept skill ids or names and normalise to ids. */
function normaliseSkillIds(input) {
  const raw = Array.isArray(input) ? input : String(input || '').split(',');
  return raw
    .map((s) => String(s).trim())
    .filter(Boolean)
    .map((s) => slugify(s, 'skill'));
}

// GET /api/volunteers?eventId=...&status=Ready&teamId=...&search=...
router.get('/', async (req, res) => {
  try {
    const { status, search, teamId } = req.query;
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    const ctx = await loadVolunteerContext(eventId, connected);
    let views = buildVolunteerViews(ctx.volunteers, ctx.assignments, ctx);

    // status/teamId filter on the *derived* view, which is why this can be a
    // plain in-memory filter instead of a half-broken Mongo query.
    if (status && status !== 'All') {
      views = views.filter((v) => v.status.toLowerCase() === String(status).toLowerCase());
    }
    if (teamId) {
      views = views.filter((v) => v.teamId === teamId);
    }
    if (search) {
      const re = new RegExp(escapeRegex(search), 'i');
      views = views.filter(
        (v) =>
          re.test(v.name || '') ||
          re.test(v.email || '') ||
          re.test(v.role || '') ||
          (v.skills || []).some((s) => re.test(s))
      );
    }

    res.json(views);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/volunteers/matches?eventId=...
 * Recommends unassigned volunteers for teams with the fewest matching skills,
 * now comparing skill *ids* instead of substrings.
 */
router.get('/matches', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    const ctx = await loadVolunteerContext(eventId, connected);
    const views = buildVolunteerViews(ctx.volunteers, ctx.assignments, ctx);
    res.json(buildMatches(views, ctx.teams));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * Shared matching logic over the read-models, so it behaves identically in both
 * stores. `volunteers` are already in view shape (with `skillIds` and `teamId`).
 */
function buildMatches(volunteers, teams) {
  const counts = new Map();
  for (const v of volunteers) {
    if (v.teamId) counts.set(v.teamId, (counts.get(v.teamId) || 0) + 1);
  }

  const teamsWithCounts = teams.map((t) => ({
    ...t,
    assignedCount: counts.get(t._id) || 0,
    requiredSkillIds: t.requiredSkillIds || [],
  }));

  const recommendations = [];

  for (const vol of volunteers) {
    // Only volunteers not yet placed on a team can be recommended.
    if (vol.teamId) continue;

    const own = new Set((vol.skillIds || []).map(String));
    let bestTeam = null;
    let matchedSkill = null;
    let matchScore = 0;

    for (const team of teamsWithCounts) {
      // Exact id intersection - no substring guessing.
      const hits = (team.requiredSkillIds || []).map(String).filter((id) => own.has(id));
      if (hits.length > matchScore) {
        matchScore = hits.length;
        bestTeam = team;
        matchedSkill = hits[0];
      }
    }

    // Nobody has a required skill: fall back to the emptiest team.
    if (!bestTeam && teamsWithCounts.length > 0) {
      bestTeam = [...teamsWithCounts].sort(
        (a, b) =>
          a.assignedCount / (a.targetCapacity || 8) - b.assignedCount / (b.targetCapacity || 8)
      )[0];
      matchedSkill = (vol.skills || [])[0] || 'General support';
    }

    if (bestTeam) {
      recommendations.push({
        volunteerId: vol._id,
        volunteerName: vol.name,
        volunteerAvatarColor: vol.avatarColor,
        targetTeamId: bestTeam._id,
        targetTeamName: bestTeam.name,
        targetTeamColor: bestTeam.color,
        reason: `${matchedSkill} skill • ${(vol.availability || []).join(', ')} availability`,
        fitScore: Math.min(95, 75 + matchScore * 10),
      });
    }
  }

  return recommendations;
}

// GET /api/volunteers/:id
router.get('/:id', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    const ctx = await loadVolunteerContext(eventId, connected);
    const view = buildVolunteerViews(ctx.volunteers, ctx.assignments, ctx).find(
      (v) => v._id === req.params.id
    );
    if (!view) return res.status(404).json({ error: 'Volunteer not found' });
    res.json(view);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/volunteers?eventId=... - creates the person AND enrols them
router.post('/', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    const data = { ...req.body };
    delete data._id;

    const person = {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      avatarColor: data.avatarColor || '#22c55e',
      notes: data.notes || '',
    };
    if (!person.name || !person.email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    person.email = String(person.email).toLowerCase();
    person.skillIds = normaliseSkillIds(data.skillIds ?? data.skills);

    // Team membership, role, availability and check-in belong to the assignment.
    const assignmentData = {
      teamId: data.teamId || null,
      role: data.role || 'General Crew',
      availability: Array.isArray(data.availability) && data.availability.length
        ? data.availability
        : ['Morning'],
    };

    // Needed to turn skill ids back into the names the UI displays.
    const skills = connected ? await Skill.find({}).lean() : memoryStore.getSkills();

    if (connected) {
      const existing = await Volunteer.findOne({ email: person.email });
      if (existing) {
        return res.status(409).json({
          error: `${person.email} is already in the volunteer directory`,
          volunteerId: existing._id,
        });
      }

      let team = null;
      if (assignmentData.teamId) {
        team = await Team.findOne({ _id: assignmentData.teamId, eventId });
        if (!team) return res.status(400).json({ error: 'That team does not exist in this event' });
      }

      const created = await Volunteer.create(person);
      const assignment = await Assignment.create({ ...assignmentData, eventId, volunteerId: created._id });

      memoryStore.syncAll({
        volunteers: await Volunteer.find({}).lean(),
        assignments: await Assignment.find({}).lean(),
      });

      // Return the same read-model shape as GET, so the client does not have to
      // special-case the create response.
      const [view] = buildVolunteerViews(
        [created.toObject()],
        [assignment.toObject()],
        { teams: team ? [team.toObject()] : [], skills }
      );
      return res.status(201).json(view);
    }

    const { volunteer, assignment } = memoryStore.createVolunteer(eventId, { ...person, ...assignmentData });
    const [view] = buildVolunteerViews(
      [volunteer],
      [assignment],
      { teams: memoryStore.getTeams(eventId), skills: memoryStore.getSkills() }
    );
    res.status(201).json(view);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'That email is already in the volunteer directory' });
    }
    res.status(500).json({ error: error.message });
  }
});

/**
 * PUT /api/volunteers/:id?eventId=...
 * Accepts both person fields (name/email/skills) and assignment fields
 * (teamId/role/availability/checkInStatus) and routes each to the right document.
 */
router.put('/:id', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    const body = req.body || {};

    // Split the payload by which document owns each field.
    const personPatch = {};
    for (const key of ['name', 'email', 'phone', 'avatarColor', 'notes']) {
      if (body[key] !== undefined) personPatch[key] = body[key];
    }
    if (body.skillIds !== undefined || body.skills !== undefined) {
      personPatch.skillIds = normaliseSkillIds(body.skillIds ?? body.skills);
    }
    if (personPatch.email) personPatch.email = String(personPatch.email).toLowerCase();

    const assignmentPatch = {};
    if (body.teamId !== undefined) assignmentPatch.teamId = body.teamId || null;
    if (body.role !== undefined) assignmentPatch.role = body.role;
    if (body.availability !== undefined) assignmentPatch.availability = body.availability;
    if (body.checkInStatus !== undefined) {
      assignmentPatch.checkedInAt = body.checkInStatus ? new Date() : null;
    }
    if (body.enrollmentStatus !== undefined) {
      assignmentPatch.enrollmentStatus = body.enrollmentStatus;
    }

    if (connected) {
      const volunteer = await Volunteer.findById(req.params.id);
      if (!volunteer) return res.status(404).json({ error: 'Volunteer not found' });

      // Guard: the team must belong to the same event as the assignment.
      if (assignmentPatch.teamId) {
        const team = await Team.findOne({ _id: assignmentPatch.teamId, eventId });
        if (!team) return res.status(400).json({ error: 'That team does not exist in this event' });
      }

      if (Object.keys(personPatch).length) {
        Object.assign(volunteer, personPatch, { updatedAt: new Date() });
        await volunteer.save();
      }

      let assignment = await Assignment.findOne({ eventId, volunteerId: volunteer._id });
      if (!assignment) {
        assignment = await Assignment.create({
          ...assignmentPatch,
          eventId,
          volunteerId: volunteer._id,
        });
      } else if (Object.keys(assignmentPatch).length) {
        Object.assign(assignment, assignmentPatch, { updatedAt: new Date() });
        await assignment.save();
      }

      const [teams, skills] = await Promise.all([
        Team.find({ eventId }).lean(),
        Skill.find({}).lean(),
      ]);
      const [view] = buildVolunteerViews([volunteer.toObject()], [assignment.toObject()], {
        teams,
        skills,
      });
      memoryStore.syncAll({
        volunteers: await Volunteer.find({}).lean(),
        assignments: await Assignment.find({}).lean(),
      });
      return res.json(view);
    }

    const updated = memoryStore.updateVolunteer(eventId, req.params.id, body);
    if (!updated) return res.status(404).json({ error: 'Volunteer not found' });
    const ctx = {
      assignments: memoryStore.getAssignments(eventId),
      teams: memoryStore.getTeams(eventId),
      skills: memoryStore.getSkills(),
    };
    const [view] = buildVolunteerViews([updated], ctx.assignments, ctx);
    res.json(view);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/volunteers/:id?eventId=... - removes them from THIS event
router.delete('/:id', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    if (connected) {
      const assignment = await Assignment.findOne({ eventId, volunteerId: req.params.id });
      if (!assignment) return res.status(404).json({ error: 'Volunteer not found' });

      await Assignment.deleteOne({ _id: assignment._id });

      // Drop them from task rosters in this event.
      await Task.updateMany(
        { eventId, assignees: req.params.id },
        { $pull: { assignees: req.params.id } }
      );

      // Only delete the person if they are enrolled in no other event.
      const elsewhere = await Assignment.countDocuments({ volunteerId: req.params.id });
      if (elsewhere === 0) await Volunteer.deleteOne({ _id: req.params.id });

      memoryStore.syncAll({
        volunteers: await Volunteer.find({}).lean(),
        assignments: await Assignment.find({}).lean(),
        tasks: await Task.find({}).lean(),
      });
      return res.json({ success: true, message: 'Volunteer removed from this event' });
    }

    const removed = memoryStore.deleteVolunteer(eventId, req.params.id);
    if (!removed) return res.status(404).json({ error: 'Volunteer not found' });
    res.json({ success: true, message: 'Volunteer removed from this event' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
