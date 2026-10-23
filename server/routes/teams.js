const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const Volunteer = require('../models/Volunteer');
const Assignment = require('../models/Assignment');
const Task = require('../models/Task');
const Skill = require('../models/Skill');
const memoryStore = require('../store/memoryStore');
const { getDBStatus } = require('../config/db');
const { requireEventId } = require('../lib/eventScope');
const { buildTeamViews } = require('../lib/views');
const { uniqueSlug, slugify } = require('../lib/ids');
const { isCoordinator, resolveVolunteerId, getEventAssignment } = require('../lib/access');
const { requireRole } = require('../middleware/auth');

// Load everything needed to render a team read-model.
async function loadTeamContext(eventId, connected) {
  if (connected) {
    const [teams, assignments, volunteers, skills] = await Promise.all([
      Team.find({ eventId }).lean(),
      Assignment.find({ eventId }).lean(),
      Volunteer.find({}).lean(),
      Skill.find({}).lean(),
    ]);
    return { teams, assignments, volunteers, skills };
  }
  return {
    teams: memoryStore.getTeams(eventId),
    assignments: memoryStore.getAssignments(eventId),
    volunteers: memoryStore.getVolunteers(eventId),
    skills: memoryStore.getSkills(),
  };
}

/** Accept either skill ids or skill names, and normalise to ids. */
function normaliseSkillIds(input, skills) {
  const raw = Array.isArray(input) ? input : String(input || '').split(',');
  return raw
    .map((s) => String(s).trim())
    .filter(Boolean)
    .map((s) => {
      const asId = slugify(s, 'skill');
      return skills.some((k) => k._id === asId) ? asId : asId;
    });
}

// GET /api/teams?eventId=... - scoped to one event
router.get('/', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    const ctx = await loadTeamContext(eventId, connected);
    const views = buildTeamViews(ctx.teams, ctx);

    // Volunteers only see the team they are on.
    if (isCoordinator(req.user)) return res.json(views);

    const volunteerId = await resolveVolunteerId(req.user);
    const assignment = await getEventAssignment(eventId, volunteerId);
    if (!assignment?.teamId) return res.json([]);
    res.json(views.filter((t) => String(t._id) === String(assignment.teamId)));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/teams/:id - one team plus its roster
router.get('/:id', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    const ctx = await loadTeamContext(eventId, connected);
    const [view] = buildTeamViews(ctx.teams, ctx).filter((t) => t._id === req.params.id || t.code === req.params.id);
    if (!view) return res.status(404).json({ error: 'Team not found' });

    if (!isCoordinator(req.user)) {
      const volunteerId = await resolveVolunteerId(req.user);
      const assignment = await getEventAssignment(eventId, volunteerId);
      if (!assignment?.teamId || String(assignment.teamId) !== String(view._id)) {
        return res.status(403).json({ error: 'You can only view your own team' });
      }
    }

    const { buildVolunteerViews } = require('../lib/views');
    const roster = buildVolunteerViews(ctx.volunteers, ctx.assignments, ctx)
      .filter((v) => v.teamId === view._id);
    res.json({ ...view, roster });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/teams?eventId=...
router.post('/', requireRole('Coordinator'), async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    const payload = { ...req.body };
    delete payload._id;
    delete payload.eventId;        // scope comes from ?eventId / header / active, never the body
    delete payload.assignedCount;  // computed, never accepted from the client
    delete payload.leadName;

    const skills = connected ? await Skill.find({}).lean() : memoryStore.getSkills();
    if (payload.requiredSkillIds !== undefined || payload.requiredSkills !== undefined) {
      payload.requiredSkillIds = normaliseSkillIds(
        payload.requiredSkillIds ?? payload.requiredSkills,
        skills
      );
      delete payload.requiredSkills;
    }
    if (payload.targetCapacity !== undefined) {
      payload.targetCapacity = Number(payload.targetCapacity) || 8;
    }

    if (connected) {
      const taken = await Team.find({ eventId }, { code: 1 }).lean();
      payload.code = payload.code || uniqueSlug(payload.name, taken.map((t) => t.code), 'team');
      const created = await Team.create({ ...payload, eventId });
      memoryStore.syncAll({ teams: await Team.find({}).lean() });
      return res.status(201).json(created);
    }

    res.status(201).json(memoryStore.createTeam(eventId, payload));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'A team with that code already exists in this event' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/teams/:id?eventId=...
router.put('/:id', requireRole('Coordinator'), async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    const payload = { ...req.body };
    delete payload._id;
    delete payload.eventId;       // scope is immutable
    delete payload.assignedCount;
    delete payload.leadName;

    const skills = connected ? await Skill.find({}).lean() : memoryStore.getSkills();
    if (payload.requiredSkillIds !== undefined || payload.requiredSkills !== undefined) {
      payload.requiredSkillIds = normaliseSkillIds(
        payload.requiredSkillIds ?? payload.requiredSkills,
        skills
      );
      delete payload.requiredSkills;
    }
    if (payload.targetCapacity !== undefined) {
      payload.targetCapacity = Number(payload.targetCapacity) || 8;
    }

    if (connected) {
      // Scope the update to the event so a stray id cannot edit another event.
      const updated = await Team.findOneAndUpdate(
        { _id: req.params.id, eventId },
        { $set: { ...payload, updatedAt: new Date() } },
        { new: true, runValidators: true }
      );
      if (!updated) return res.status(404).json({ error: 'Team not found' });
      memoryStore.syncAll({ teams: await Team.find({}).lean() });
      return res.json(updated);
    }

    const updated = memoryStore.updateTeam(eventId, req.params.id, payload);
    if (!updated) return res.status(404).json({ error: 'Team not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/teams/:id?eventId=... - unassigns crew, never deletes people
router.delete('/:id', requireRole('Coordinator'), async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    if (connected) {
      const team = await Team.findOne({ _id: req.params.id, eventId });
      if (!team) return res.status(404).json({ error: 'Team not found' });

      await Team.findByIdAndDelete(team._id);
      // Volunteers survive; they simply become unassigned.
      await Assignment.updateMany({ eventId, teamId: team._id }, { $set: { teamId: null } });
      await Task.updateMany({ eventId, teamId: team._id }, { $set: { teamId: null } });

      memoryStore.syncAll({
        teams: await Team.find({}).lean(),
        assignments: await Assignment.find({}).lean(),
        tasks: await Task.find({}).lean(),
      });
      return res.json({ success: true, message: 'Team removed; its volunteers are now unassigned' });
    }

    const removed = memoryStore.deleteTeam(eventId, req.params.id);
    if (!removed) return res.status(404).json({ error: 'Team not found' });
    res.json({ success: true, message: 'Team removed; its volunteers are now unassigned' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
