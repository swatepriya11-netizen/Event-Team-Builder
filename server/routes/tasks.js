const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Team = require('../models/Team');
const Volunteer = require('../models/Volunteer');
const Assignment = require('../models/Assignment');
const memoryStore = require('../store/memoryStore');
const { getDBStatus } = require('../config/db');
const { requireEventId } = require('../lib/eventScope');
const { buildTaskViews } = require('../lib/views');
const { isCoordinator, resolveVolunteerId, scopeTasks } = require('../lib/access');
const { requireRole } = require('../middleware/auth');

// Priority rank - sorting by the raw string yields High, Low, Medium.
const PRIORITY_RANK = { High: 0, Medium: 1, Low: 2 };

async function loadTaskContext(eventId, connected) {
  if (connected) {
    const [tasks, teams, assignments] = await Promise.all([
      Task.find({ eventId }).lean(),
      Team.find({ eventId }).lean(),
      Assignment.find({ eventId }).lean(),
    ]);
    const volunteerIds = [
      ...new Set([...tasks.flatMap((t) => t.assignees || []), ...assignments.map((a) => a.volunteerId)]),
    ];
    const volunteers = volunteerIds.length
      ? await Volunteer.find({ _id: { $in: volunteerIds } }).lean()
      : [];
    return { tasks, teams, volunteers };
  }
  return {
    tasks: memoryStore.getTasks(eventId),
    teams: memoryStore.getTeams(eventId),
    volunteers: memoryStore.getVolunteers(eventId),
  };
}

/** Accept "09:30" + a date, or a full ISO string. */
function normaliseShift(input) {
  const out = {};
  if (input.shiftStart !== undefined) out.shiftStart = input.shiftStart || null;
  if (input.shiftEnd !== undefined) out.shiftEnd = input.shiftEnd || null;

  // The old modal sent shiftTime: "09:30 - Shift 1" and shiftDate: "19 September
  // 2026". Combine them into a real Date if that is what arrived.
  if (out.shiftStart === undefined && input.shiftTime && input.shiftDate) {
    const time = String(input.shiftTime).match(/(\d{1,2}):(\d{2})/);
    const date = new Date(input.shiftDate);
    if (time && !Number.isNaN(date.getTime())) {
      date.setHours(Number(time[1]), Number(time[2]), 0, 0);
      out.shiftStart = date;
      const endMatch = String(input.shiftTime).match(/(\d{1,2}):(\d{2})\s*[-–]\s*(\d{1,2}):(\d{2})/);
      if (endMatch) {
        const end = new Date(date);
        end.setHours(Number(endMatch[3]), Number(endMatch[4]), 0, 0);
        out.shiftEnd = end;
      }
    }
  }
  return out;
}

// GET /api/tasks?eventId=...
router.get('/', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    const ctx = await loadTaskContext(eventId, connected);
    const views = await scopeTasks(req.user, eventId, buildTaskViews(ctx.tasks, ctx));

    views.sort(
      (a, b) =>
        (PRIORITY_RANK[a.priority] ?? 3) - (PRIORITY_RANK[b.priority] ?? 3) ||
        new Date(a.shiftStart || 0) - new Date(b.shiftStart || 0)
    );
    res.json(views);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/tasks/metrics?eventId=...
router.get('/metrics', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    const ctx = await loadTaskContext(eventId, connected);
    const tasks = await scopeTasks(req.user, eventId, buildTaskViews(ctx.tasks, ctx));

    const totalTasks = tasks.length;
    const highPriorityTasks = tasks.filter((t) => t.priority === 'High').length;
    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
    const activeShifts = inProgressTasks + tasks.filter((t) => t.status === 'Pending').length;
    const completionRateValue = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // assignedCrewCount is derived from the real assignees array, so coverage
    // can no longer disagree with the roster.
    const totalRequiredCrew = tasks.reduce((s, t) => s + (t.requiredCrew || 0), 0);
    const totalAssignedCrew = tasks.reduce((s, t) => s + (t.assignees?.length || 0), 0);

    res.json({
      totalTasks,
      totalTasksLabel: `${totalTasks} Tasks`,
      highPriority: highPriorityTasks,
      highPrioritySubtext: `⚠ ${highPriorityTasks} High Priority`,
      activeShifts,
      activeShiftsLabel: `${activeShifts} Shifts`,
      activeShiftsSubtext: 'Morning & Afternoon',
      staffCoverage: `${totalAssignedCrew} / ${totalRequiredCrew}`,
      staffCoverageAssigned: totalAssignedCrew,
      staffCoverageRequired: totalRequiredCrew,
      staffCoveragePercent:
        totalRequiredCrew > 0
          ? `${Math.round((totalAssignedCrew / totalRequiredCrew) * 100)}% Capacity Assigned`
          : '0% Capacity Assigned',
      completionRate: completionRateValue,
      completionRateLabel: `${completionRateValue}%`,
      completionRateSubtext: null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/tasks/:id
router.get('/:id', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    const ctx = await loadTaskContext(eventId, connected);
    const views = await scopeTasks(req.user, eventId, buildTaskViews(ctx.tasks, ctx));
    const view = views.find((t) => t._id === req.params.id);
    if (!view) return res.status(404).json({ error: 'Task not found' });
    res.json(view);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/tasks?eventId=...
router.post('/', requireRole('Coordinator'), async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    const data = { ...req.body };
    delete data._id;
    delete data.eventId;          // scope comes from ?eventId / header / active, never the body
    delete data.assigneeNames;      // replaced by assignees
    delete data.assignedCrewCount; // computed
    delete data.teamName;          // computed
    delete data.shiftTime;
    delete data.shiftDate;

    if (!data.title) return res.status(400).json({ error: 'Task title is required' });

    const shift = normaliseShift(data);
    if (!shift.shiftStart) return res.status(400).json({ error: 'A shift start time is required' });

    if (data.teamId) {
      const ok = connected
        ? await Team.exists({ _id: data.teamId, eventId })
        : Boolean(memoryStore.getTeam(eventId, data.teamId));
      if (!ok) return res.status(400).json({ error: 'That team does not exist in this event' });
    }

    const payload = {
      ...data,
      ...shift,
      priority: ['High', 'Medium', 'Low'].includes(data.priority) ? data.priority : 'Medium',
      status: ['Pending', 'In Progress', 'Completed'].includes(data.status) ? data.status : 'Pending',
      requiredCrew: Number(data.requiredCrew) || 4,
      assignees: Array.isArray(data.assignees) ? data.assignees : [],
      location: data.location || 'Main Stage',
    };

    if (connected) {
      const created = await Task.create({ ...payload, eventId });
      memoryStore.syncAll({ tasks: await Task.find({}).lean() });
      return res.status(201).json(created);
    }
    res.status(201).json(memoryStore.createTask(eventId, payload));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/tasks/:id?eventId=...
router.put('/:id', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    // Volunteers may only move a task they are personally assigned to between
    // statuses. Ignore every other field rather than letting a crafted request
    // rewrite the roster, schedule or team.
    if (!isCoordinator(req.user)) {
      const volunteerId = await resolveVolunteerId(req.user);
      const rawTask = connected
        ? await Task.findOne({ _id: req.params.id, eventId }).lean()
        : memoryStore.getTask(eventId, req.params.id);
      if (!rawTask) return res.status(404).json({ error: 'Task not found' });

      const isAssignee = (rawTask.assignees || []).map(String).includes(String(volunteerId));
      if (!isAssignee) {
        return res.status(403).json({ error: 'You can only update tasks assigned to you' });
      }

      const status = req.body?.status;
      if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
        return res.status(400).json({ error: 'You may only update the task status' });
      }
      req.body = { status };
    }

    const payload = { ...req.body };
    delete payload._id;
    delete payload.eventId;
    delete payload.assigneeNames;
    delete payload.assignedCrewCount;
    delete payload.teamName;

    const shift = normaliseShift(payload);
    delete payload.shiftTime;
    delete payload.shiftDate;
    Object.assign(payload, shift);

    if (payload.assignees !== undefined && !Array.isArray(payload.assignees)) {
      payload.assignees = [];
    }
    if (payload.requiredCrew !== undefined) {
      payload.requiredCrew = Number(payload.requiredCrew) || 0;
    }

    if (connected) {
      const updated = await Task.findOneAndUpdate(
        { _id: req.params.id, eventId },
        { $set: { ...payload, updatedAt: new Date() } },
        { new: true, runValidators: true }
      );
      if (!updated) return res.status(404).json({ error: 'Task not found' });
      memoryStore.syncAll({ tasks: await Task.find({}).lean() });
      return res.json(updated);
    }

    const updated = memoryStore.updateTask(eventId, req.params.id, payload);
    if (!updated) return res.status(404).json({ error: 'Task not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/tasks/:id?eventId=...
router.delete('/:id', requireRole('Coordinator'), async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const eventId = await requireEventId(req, res);
    if (!eventId) return;

    if (connected) {
      const deleted = await Task.findOneAndDelete({ _id: req.params.id, eventId });
      if (!deleted) return res.status(404).json({ error: 'Task not found' });
      memoryStore.syncAll({ tasks: await Task.find({}).lean() });
      return res.json({ success: true });
    }

    const deleted = memoryStore.deleteTask(eventId, req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Task not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
