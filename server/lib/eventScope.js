const { getDBStatus } = require('../config/db');

/**
 * Every data route is scoped to one event. This module is the single place that
 * decides *which* event a request is talking about, so no route has to repeat
 * the fallback logic (and none of them can accidentally forget it).
 *
 * Resolution order:
 *   1. ?eventId=... query parameter
 *   2. x-event-id header
 *   3. the active event (exactly one Event has isActive: true)
 *   4. the earliest event by start date, so the app still works with no active
 *      flag set rather than erroring out
 */

/** Ids of every event, in both stores. */
async function listEvents() {
  const { connected } = getDBStatus();
  if (connected) {
    const Event = require('../models/Event');
    return Event.find({}).sort({ startsAt: 1 }).lean();
  }
  return require('../store/memoryStore').listEvents();
}

/** The event used when a request does not name one. */
async function getDefaultEvent() {
  const events = await listEvents();
  if (!events.length) return null;
  return events.find((e) => e.isActive) || events[0];
}

/**
 * Resolve the eventId a request should be scoped to.
 * @returns {Promise<string|null>} null only when no events exist at all.
 */
async function resolveEventId(req) {
  const explicit = (req.query && req.query.eventId) || req.headers['x-event-id'];
  if (explicit) return String(explicit);

  const fallback = await getDefaultEvent();
  return fallback ? fallback._id : null;
}

/**
 * Resolve the eventId, or fail the request with a clear message.
 * Use in routes that genuinely cannot operate without an event.
 */
async function requireEventId(req, res) {
  const eventId = await resolveEventId(req);
  if (!eventId) {
    res.status(400).json({
      error: 'No events exist yet. Create an event before adding teams, volunteers or tasks.',
    });
    return null;
  }
  return eventId;
}

module.exports = { resolveEventId, requireEventId, getDefaultEvent, listEvents };
