const { events, skills, volunteers, teams, assignments, tasks } = require('./seedData');
const { slugify } = require('../lib/ids');

/**
 * Insert the demo dataset into MongoDB.
 *
 * Shared by `npm run seed` and the boot-time auto-seed, so both produce exactly
 * the same database. Works against the raw driver rather than the models so the
 * explicit ids in seedData.js are preserved verbatim (Mongoose would otherwise
 * try to cast "team-stage-ops" and throw).
 *
 * Insert order is dependency order, so every readable reference resolves.
 */
async function seedAll() {
  const mongoose = require('mongoose');
  const db = mongoose.connection.db;

  await db.collection('assignments').deleteMany({});
  await db.collection('tasks').deleteMany({});
  await db.collection('teams').deleteMany({});
  await db.collection('volunteers').deleteMany({});
  await db.collection('skills').deleteMany({});
  await db.collection('events').deleteMany({});

  // Build the indexes explicitly. Without these the unique constraints that
  // keep the schema honest (one assignment per volunteer per event, unique team
  // codes, unique volunteer emails) would not actually be enforced.
  // Each model module exports the model directly, not a named property.
  const Skill = require('../models/Skill');
  const Team = require('../models/Team');
  const Volunteer = require('../models/Volunteer');
  const Assignment = require('../models/Assignment');
  const Task = require('../models/Task');
  const Event = require('../models/Event');
  await Promise.all([
    Skill.syncIndexes(),
    Team.syncIndexes(),
    Volunteer.syncIndexes(),
    Assignment.syncIndexes(),
    Task.syncIndexes(),
    Event.syncIndexes(),
  ]);

  await db.collection('events').insertMany(events);
  await db.collection('skills').insertMany(
    skills.map((s) => ({ _id: slugify(s.name, 'skill'), ...s }))
  );
  await db.collection('volunteers').insertMany(volunteers);
  await db.collection('teams').insertMany(teams);
  await db.collection('assignments').insertMany(assignments);
  await db.collection('tasks').insertMany(tasks);

  return {
    events: events.length,
    skills: skills.length,
    volunteers: volunteers.length,
    teams: teams.length,
    assignments: assignments.length,
    tasks: tasks.length,
  };
}

/** Human-readable summary of what got seeded, per event. */
function summarise() {
  return events.map((e) => ({
    name: e.name,
    id: e._id,
    isActive: e.isActive,
    teams: teams.filter((t) => t.eventId === e._id).length,
    volunteers: assignments.filter((a) => a.eventId === e._id).length,
    tasks: tasks.filter((t) => t.eventId === e._id).length,
  }));
}

module.exports = { seedAll, summarise };
