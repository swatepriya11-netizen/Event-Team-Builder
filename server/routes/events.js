const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const Team = require('../models/Team');
const Volunteer = require('../models/Volunteer');
const Assignment = require('../models/Assignment');
const Task = require('../models/Task');
const memoryStore = require('../store/memoryStore');
const { getDBStatus } = require('../config/db');
const { resolveEventId } = require('../lib/eventScope');
const { buildEventView } = require('../lib/views');
const { slugify, uniqueSlug } = require('../lib/ids');

/**
 * Events are now a real collection. Previously GET /api/events returned a single
 * hardcoded document (Event.findOne()) and PUT upserted into the same one, so
 * the database could hold exactly one event forever.
 */

// GET /api/events - list every event, with per-event counts for the switcher
router.get('/', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    let list;
    let activeId = null;

    if (connected) {
      list = await Event.find({}).sort({ startsAt: 1 }).lean();
      activeId = (await Event.findOne({ isActive: true }).lean())?._id || list[0]?._id || null;

      // Counts are only needed for the switcher, so one aggregate per event
      // rather than N queries.
      const ids = list.map((e) => e._id);
      const [teamCounts, assignmentCounts, taskCounts] = await Promise.all([
        Team.aggregate([{ $match: { eventId: { $in: ids } } }, { $group: { _id: '$eventId', n: { $sum: 1 } } }]),
        Assignment.aggregate([{ $match: { eventId: { $in: ids } } }, { $group: { _id: '$eventId', n: { $sum: 1 } } }]),
        Task.aggregate([{ $match: { eventId: { $in: ids } } }, { $group: { _id: '$eventId', n: { $sum: 1 } } }]),
      ]);
      const tally = (rows) => new Map(rows.map((r) => [r._id, r.n]));
      const tc = tally(teamCounts);
      const ac = tally(assignmentCounts);
      const kc = tally(taskCounts);

      list = list.map((e) => ({
        ...e,
        counts: { teams: tc.get(e._id) || 0, volunteers: ac.get(e._id) || 0, tasks: kc.get(e._id) || 0 },
      }));
    } else {
      list = memoryStore.listEvents().map((e) => ({
        ...e,
        counts: memoryStore.getCounts(e._id),
      }));
      activeId = memoryStore.getActiveEvent()?._id || null;
    }

    res.json(list.map((e) => buildEventView(e, { isActive: e._id === activeId })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/events/active - the event used when a request names none
router.get('/active', async (req, res) => {
  try {
    const eventId = await resolveEventId(req);
    if (!eventId) return res.status(404).json({ error: 'No events exist yet' });
    const { connected } = getDBStatus();
    const event = connected
      ? await Event.findById(eventId).lean()
      : memoryStore.getEvent(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(buildEventView(event));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/events/:id
router.get('/:id', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const event = connected
      ? await Event.findOne({ $or: [{ _id: req.params.id }, { slug: req.params.id }] }).lean()
      : memoryStore.getEvent(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(buildEventView(event));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/events - create an event
router.post('/', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const body = { ...req.body };

    if (!body.name) return res.status(400).json({ error: 'Event name is required' });
    if (!body.startsAt || !body.endsAt) {
      return res.status(400).json({ error: 'Start and end dates are required' });
    }
    if (new Date(body.endsAt) < new Date(body.startsAt)) {
      return res.status(400).json({ error: 'End date cannot be before the start date' });
    }

    // Flatten the legacy top-level settings into the nested object.
    if (body.shiftAlerts || body.autoMatching !== undefined || body.coordinatorEditing !== undefined) {
      const leadMinutes = Number(String(body.shiftAlerts || '').match(/(\d+)\s*h/)?.[1]) * 60 || 120;
      body.settings = {
        autoMatching: body.autoMatching ?? true,
        coordinatorEditing: body.coordinatorEditing ?? true,
        shiftAlertLeadMinutes: leadMinutes,
        ...body.settings,
      };
      delete body.shiftAlerts;
      delete body.autoMatching;
      delete body.coordinatorEditing;
    }
    delete body.dates;
    delete body._id;
    delete body.slug;

    if (connected) {
      const taken = await Event.find({}, { slug: 1 }).lean();
      const slug = uniqueSlug(body.name, taken.map((e) => e.slug), 'event');
      const event = await Event.create({ ...body, slug, _id: `evt-${slug}` });
      if (event.isActive) await Event.updateMany({ _id: { $ne: event._id } }, { $set: { isActive: false } });
      memoryStore.syncAll({ events: await Event.find({}).lean() });
      return res.status(201).json(buildEventView(event.toObject()));
    }

    const created = memoryStore.createEvent(body);
    res.status(201).json(buildEventView(created));
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'An event with that name already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/events/:id
router.put('/:id', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    const body = { ...req.body };
    delete body._id;
    delete body.dates;
    delete body.slug;

    if (body.shiftAlerts || body.autoMatching !== undefined || body.coordinatorEditing !== undefined) {
      const leadMinutes = Number(String(body.shiftAlerts || '').match(/(\d+)\s*h/)?.[1]) * 60 || 120;
      body.settings = {
        autoMatching: body.autoMatching ?? true,
        coordinatorEditing: body.coordinatorEditing ?? true,
        shiftAlertLeadMinutes: leadMinutes,
        ...body.settings,
      };
      delete body.shiftAlerts;
      delete body.autoMatching;
      delete body.coordinatorEditing;
    }

    if (connected) {
      const updated = await Event.findByIdAndUpdate(
        req.params.id,
        { $set: { ...body, updatedAt: new Date() } },
        { new: true, runValidators: true }
      );
      if (!updated) return res.status(404).json({ error: 'Event not found' });
      memoryStore.syncAll({ events: await Event.find({}).lean() });
      return res.json(buildEventView(updated.toObject()));
    }

    const updated = memoryStore.updateEvent(req.params.id, body);
    if (!updated) return res.status(404).json({ error: 'Event not found' });
    res.json(buildEventView(updated));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/events/:id/activate - exactly one event is the default scope
router.post('/:id/activate', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    if (connected) {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ error: 'Event not found' });
      await Event.updateMany({}, { $set: { isActive: false } });
      event.isActive = true;
      await event.save();
      memoryStore.syncAll({ events: await Event.find({}).lean() });
      return res.json(buildEventView(event.toObject()));
    }
    const event = memoryStore.setActiveEvent(req.params.id);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    res.json(buildEventView(event));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/events/:id - cascades to everything scoped to the event
router.delete('/:id', async (req, res) => {
  try {
    const { connected } = getDBStatus();
    if (connected) {
      const event = await Event.findById(req.params.id);
      if (!event) return res.status(404).json({ error: 'Event not found' });

      await Assignment.deleteMany({ eventId: event._id });
      await Task.deleteMany({ eventId: event._id });
      await Team.deleteMany({ eventId: event._id });

      // Volunteers are shared people; only delete any left with no assignments.
      const remaining = await Assignment.distinct('volunteerId');
      await Volunteer.deleteMany({ _id: { $nin: remaining } });

      await Event.findByIdAndDelete(event._id);

      // Never leave the app with no default scope.
      if (event.isActive) {
        const next = await Event.findOne({});
        if (next) {
          next.isActive = true;
          await next.save();
        }
      }

      memoryStore.syncAll({
        events: await Event.find({}).lean(),
        teams: await Team.find({}).lean(),
        volunteers: await Volunteer.find({}).lean(),
        assignments: await Assignment.find({}).lean(),
        tasks: await Task.find({}).lean(),
      });
      return res.json({ success: true, message: 'Event and all of its data removed' });
    }

    const removed = memoryStore.deleteEvent(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Event not found' });
    res.json({ success: true, message: 'Event and all of its data removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
