const express = require('express');
const router = express.Router();
const { connectDB, getDBStatus } = require('../config/db');
const { requireRole } = require('../middleware/auth');
const { resolveEventId, listEvents } = require('../lib/eventScope');
const { syncMirror } = require('../lib/sync');
const { seedAll, summarise } = require('../seed/seedService');
const memoryStore = require('../store/memoryStore');
const Volunteer = require('../models/Volunteer');
const Team = require('../models/Team');
const Task = require('../models/Task');
const Assignment = require('../models/Assignment');
const Event = require('../models/Event');
const Skill = require('../models/Skill');
const User = require('../models/User');

// GET MongoDB connection & system health status
router.get('/status', async (req, res) => {
  try {
    const status = getDBStatus();
    const eventId = await resolveEventId(req);

    let counts;
    if (status.connected) {
      // Count per event so the switcher can show the active event's numbers.
      const scope = eventId ? { eventId } : {};
      const [volunteers, teams, tasks, events, skills] = await Promise.all([
        Assignment.countDocuments(scope),
        Team.countDocuments(scope),
        Task.countDocuments(scope),
        Event.countDocuments({}),
        Skill.countDocuments({}),
      ]);
      counts = { volunteers, teams, tasks, events, skills };
    } else {
      counts = memoryStore.getCounts(eventId);
    }

    res.json({
      ...status,
      counts,
      eventId: eventId || null,
      timestamp: new Date(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET every event (used by the client switcher; public within the auth wall)
router.get('/events', async (req, res) => {
  try {
    res.json(await listEvents());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST test & connect a new MongoDB URI (Coordinator only - it mutates the
// process-wide connection and may wipe + reseed collections).
router.post('/connect-mongodb', requireRole('Coordinator'), async (req, res) => {
  const { uri } = req.body;
  if (!uri) {
    return res.status(400).json({ error: 'MongoDB URI is required' });
  }

  try {
    console.log(`[System] Re-attempting MongoDB connection with URI: ${uri.replace(/:([^:@]+)@/, ':****@')}`);
    // Capture who is asking before the switch. requireAuth looks the account up
    // by id on every request, and ids are per-database, so if this account does
    // not exist in the database we are about to connect to, every signed-in
    // session (this one included) starts failing with "Account no longer exists".
    const requestingUserId = req.user ? req.user._id || req.user.id : null;
    const result = await connectDB(uri);

    if (result.success) {
      // A seed failure must not mask a successful connection.
      let seeded = false;
      let seedWarning = null;
      try {
        if ((await Event.estimatedDocumentCount()) === 0) {
          console.log('[System] Connected MongoDB has no events. Auto-seeding demo data...');
          await seedAll();
          seeded = true;
        }
      } catch (seedErr) {
        seedWarning = seedErr.message;
        console.error('[System] Auto-seed failed (connection is still live):', seedErr.message);
      }

      // Keep the fallback store matching whatever we just connected to.
      try {
        await syncMirror();
      } catch (mirrorErr) {
        console.warn('[System] Fallback sync failed:', mirrorErr.message);
      }

      // Did the connection switch away from the account making the request?
      let sessionInvalidated = false;
      if (requestingUserId) {
        try {
          const stillThere = await User.findById(requestingUserId).select('_id');
          sessionInvalidated = !stillThere;
        } catch (_) {
          sessionInvalidated = false; // cannot tell - do not claim a logout
        }
      }
      if (sessionInvalidated) {
        console.warn(
          `[System] Connected to a database that does not contain account ${requestingUserId}. ` +
          'All existing sessions are now invalid and clients must sign in again.'
        );
      }

      return res.json({
        success: true,
        message: seeded
          ? 'Successfully connected to MongoDB and seeded demo data!'
          : 'Successfully connected to MongoDB and verified collections!',
        seeded,
        seedWarning,
        // Clients must clear their token when this is true, otherwise every
        // later request fails with an unexplained 401.
        sessionInvalidated,
        sessionMessage: sessionInvalidated
          ? 'Connected to a different database. This account does not exist there, so everyone must sign in again.'
          : null,
        status: getDBStatus(),
      });
    }

    return res.status(400).json({
      success: false,
      message: result.message,
      tip: result.tip,
      status: getDBStatus(),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
      status: getDBStatus(),
    });
  }
});

// POST trigger database seed (Coordinator only - this wipes all demo data)
router.post('/seed', requireRole('Coordinator'), async (req, res) => {
  try {
    if (getDBStatus().connected) {
      const counts = await seedAll();
      await syncMirror();
      return res.json({
        success: true,
        message: `Seeded ${counts.events} events, ${counts.volunteers} volunteers, ${counts.teams} teams and ${counts.tasks} tasks!`,
        events: summarise(),
      });
    }

    memoryStore.reset();
    return res.json({
      success: true,
      message: `Local workspace reset with ${memoryStore.events.length} events!`,
      events: memoryStore.listEvents().map((e) => ({ ...e, name: e.name })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
