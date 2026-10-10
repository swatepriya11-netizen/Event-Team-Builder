const memoryStore = require('../store/memoryStore');

/**
 * Pull every collection out of MongoDB into the in-memory fallback store.
 *
 * Called on boot and whenever a connection is (re)established. Without this, a
 * database outage would silently fall back to the original seed data rather
 * than to whatever the user had actually been working on.
 */
async function syncMirror() {
  // Each model module exports the model directly, not a named property.
  const Event = require('../models/Event');
  const Skill = require('../models/Skill');
  const Team = require('../models/Team');
  const Volunteer = require('../models/Volunteer');
  const Assignment = require('../models/Assignment');
  const Task = require('../models/Task');
  const User = require('../models/User');

  const [events, skills, teams, volunteers, assignments, tasks, users] = await Promise.all([
    Event.find({}).lean(),
    Skill.find({}).lean(),
    Team.find({}).lean(),
    Volunteer.find({}).lean(),
    Assignment.find({}).lean(),
    Task.find({}).lean(),
    // password is select:false, so it must be opted into explicitly - without the
    // hash nobody could sign in while the database is unreachable.
    User.find({}).select('+password').lean(),
  ]);

  memoryStore.syncAll({ events, skills, teams, volunteers, assignments, tasks, users });
  return { events, skills, teams, volunteers, assignments, tasks, users };
}

module.exports = { syncMirror };
