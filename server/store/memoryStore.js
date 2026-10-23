const bcrypt = require('bcryptjs');
const {
  events,
  skills,
  volunteers,
  teams,
  assignments,
  tasks,
  users: seedUsers,
} = require('../seed/seedData');
const { slugify, uniqueSlug, makeId } = require('../lib/ids');

const clone = (value) => JSON.parse(JSON.stringify(value));

// Must match SALT_ROUNDS in models/User.js, or a hash written by one store
// would fail to verify against the other.
const SALT_ROUNDS = 12;

/**
 * In-memory fallback store, used whenever MongoDB is unreachable.
 *
 * It mirrors the normalised schema exactly (events / skills / volunteers /
 * teams / assignments / tasks) so every route can run identical logic against
 * either backend. Documents written to MongoDB are mirrored in here as well, so
 * losing the database mid-session degrades to in-memory rather than to stale
 * seed data.
 *
 * Every accessor is event-scoped, which is what makes multiple events work in
 * fallback mode too.
 *
 * Accounts are mirrored too. Without them "resilient local mode" would be a
 * hollow promise: sign-in would fail and every token would be rejected, so the
 * app would be unusable the moment the database went away.
 */
class MemoryStore {
  constructor() {
    this.reset();
  }

  reset() {
    this.events = clone(events);
    this.skills = clone(skills).map((s) => ({ _id: slugify(s.name, 'skill'), ...s }));
    this.volunteers = clone(volunteers);
    this.teams = clone(teams);
    this.assignments = clone(assignments);
    this.tasks = clone(tasks);

    this.users = [];
    // Users are seeded lazily because bcrypt is deliberately slow and this
    // singleton is constructed synchronously at require() time.
    this.usersSeeded = false;
  }

  /**
   * Replace the mirror with authoritative MongoDB documents.
   * Called when a connection is (re)established so fallback data matches the DB.
   */
  syncAll(docs) {
    if (docs.events) this.events = clone(docs.events);
    if (docs.skills) this.skills = clone(docs.skills);
    if (docs.volunteers) this.volunteers = clone(docs.volunteers);
    if (docs.teams) this.teams = clone(docs.teams);
    if (docs.assignments) this.assignments = clone(docs.assignments);
    if (docs.tasks) this.tasks = clone(docs.tasks);
    if (docs.users) this.syncUsers(docs.users);
  }

  // ── generic collection helpers ────────────────────────────────────────────
  _insert(collection, doc) {
    this[collection].push(doc);
    return doc;
  }

  _upsert(collection, doc) {
    const plain = typeof doc.toObject === 'function' ? doc.toObject() : { ...doc };
    const i = this[collection].findIndex((d) => String(d._id) === String(plain._id));
    if (i === -1) this[collection].push(plain);
    else this[collection][i] = { ...this[collection][i], ...plain };
    return plain;
  }

  _replace(collection, id, patch) {
    const i = this[collection].findIndex((d) => String(d._id) === String(id));
    if (i === -1) return null;
    this[collection][i] = { ...this[collection][i], ...patch, updatedAt: new Date() };
    return this[collection][i];
  }

  _remove(collection, predicate) {
    const before = this[collection].length;
    this[collection] = this[collection].filter((d) => !predicate(d));
    return before !== this[collection].length;
  }

  // ── Events ────────────────────────────────────────────────────────────────
  listEvents() {
    return [...this.events].sort((a, b) => new Date(a.startsAt) - new Date(b.startsAt));
  }

  getEvent(id) {
    return this.events.find((e) => e._id === id || e.slug === id) || null;
  }

  getActiveEvent() {
    return this.events.find((e) => e.isActive) || this.listEvents()[0] || null;
  }

  createEvent(data) {
    const taken = this.events.map((e) => e.slug);
    const slug = data.slug || uniqueSlug(data.name, taken, 'event');
    const event = {
      startsAt: new Date(),
      endsAt: new Date(),
      ...data,
      _id: data._id || `evt-${slug}`,
      slug,
      isActive: Boolean(data.isActive),
      createdAt: data.createdAt || new Date(),
      updatedAt: new Date(),
    };
    // First event ever must become active, or the app has no default scope.
    if (this.events.length === 0) event.isActive = true;
    this.events.push(event);
    return event;
  }

  updateEvent(id, data) {
    const i = this.events.findIndex((e) => e._id === id);
    if (i === -1) return null;
    this.events[i] = { ...this.events[i], ...data, updatedAt: new Date() };
    return this.events[i];
  }

  /** Make one event active; every other event is deactivated. */
  setActiveEvent(id) {
    this.events.forEach((e) => {
      e.isActive = e._id === id;
    });
    return this.getEvent(id);
  }

  /** Deleting an event cascades to everything scoped to it. */
  deleteEvent(id) {
    const event = this.getEvent(id);
    if (!event) return false;
    const key = event._id;
    this.events = this.events.filter((e) => e._id !== key);
    this.teams = this.teams.filter((t) => t.eventId !== key);
    this.assignments = this.assignments.filter((a) => a.eventId !== key);
    this.tasks = this.tasks.filter((t) => t.eventId !== key);

    // Volunteers are global people, so only drop ones with no remaining
    // assignments in any other event.
    const stillUsed = new Set(this.assignments.map((a) => a.volunteerId));
    this.volunteers = this.volunteers.filter((v) => stillUsed.has(v._id));
    return true;
  }

  // ── Skills ────────────────────────────────────────────────────────────────
  getSkills() {
    return [...this.skills];
  }

  createSkill(data) {
    const taken = this.skills.map((s) => s._id);
    const _id = data._id || uniqueSlug(data.name, taken, 'skill');
    return this._insert('skills', { _id, active: true, ...data });
  }

  // ── Teams ─────────────────────────────────────────────────────────────────
  getTeams(eventId) {
    return this.teams.filter((t) => t.eventId === eventId);
  }

  getTeam(eventId, id) {
    return this.teams.find((t) => t.eventId === eventId && (t._id === id || t.code === id)) || null;
  }

  createTeam(eventId, data) {
    const taken = this.getTeams(eventId).map((t) => t.code);
    const team = {
      ...data,
      // Invariants applied AFTER the spread so client input cannot clobber them.
      _id: data._id || makeId('team'),
      eventId,
      code: data.code || uniqueSlug(data.name, taken, 'team'),
      color: data.color || '#22c55e',
      targetCapacity: Number(data.targetCapacity) || 8,
      leadVolunteerId: data.leadVolunteerId || null,
      requiredSkillIds: Array.isArray(data.requiredSkillIds) ? data.requiredSkillIds : [],
      createdAt: data.createdAt || new Date(),
      updatedAt: new Date(),
    };
    return this._insert('teams', team);
  }

  updateTeam(eventId, id, data) {
    const team = this.getTeam(eventId, id);
    if (!team) return null;
    return this._replace('teams', team._id, data);
  }

  /** Deleting a team leaves its volunteers unassigned rather than deleting them. */
  deleteTeam(eventId, id) {
    const team = this.getTeam(eventId, id);
    if (!team) return false;
    this.teams = this.teams.filter((t) => t._id !== team._id);
    this.assignments.forEach((a) => {
      if (a.teamId === team._id) a.teamId = null;
    });
    this.tasks.forEach((t) => {
      if (t.teamId === team._id) t.teamId = null;
    });
    return true;
  }

  // ── Assignments ───────────────────────────────────────────────────────────
  getAssignments(eventId) {
    return this.assignments.filter((a) => a.eventId === eventId);
  }

  /**
   * Find or create the single assignment for a volunteer within an event.
   * The unique {eventId, volunteerId} index guarantees one row per pair; this
   * mirrors that behaviour.
   */
  upsertAssignment(eventId, volunteerId, patch = {}) {
    let assignment = this.assignments.find(
      (a) => a.eventId === eventId && a.volunteerId === volunteerId
    );
    if (!assignment) {
      assignment = {
        _id: makeId('asg'),
        eventId,
        volunteerId,
        teamId: null,
        role: 'General Crew',
        enrollmentStatus: 'Confirmed',
        availability: ['Morning'],
        checkedInAt: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.assignments.push(assignment);
    }
    Object.assign(assignment, patch, { updatedAt: new Date() });
    return assignment;
  }

  // ── Volunteers ────────────────────────────────────────────────────────────
  /** Volunteers participating in an event, i.e. those with an assignment. */
  getVolunteers(eventId) {
    const ids = new Set(this.getAssignments(eventId).map((a) => a.volunteerId));
    return this.volunteers.filter((v) => ids.has(v._id));
  }

  getVolunteer(eventId, id) {
    return this.getVolunteers(eventId).find((v) => v._id === id) || null;
  }

  /** Create the person, then enrol them in the event. */
  createVolunteer(eventId, data) {
    const vol = {
      ...data,
      _id: data._id || makeId('vol'),
      // The modal sends skills as a comma string; normalise after the spread.
      skillIds: Array.isArray(data.skillIds)
        ? data.skillIds
        : Array.isArray(data.skills)
          ? data.skills.map((s) => slugify(s, 'skill'))
          : data.skills
            ? String(data.skills).split(',').map((s) => slugify(s, 'skill')).filter(Boolean)
            : [],
      avatarColor: data.avatarColor || '#22c55e',
      createdAt: data.createdAt || new Date(),
      updatedAt: new Date(),
    };
    delete vol.skills;
    this.volunteers.push(vol);

    const assignment = this.upsertAssignment(eventId, vol._id, {
      teamId: data.teamId || null,
      role: data.role || 'General Crew',
      availability: Array.isArray(data.availability) && data.availability.length
        ? data.availability
        : ['Morning'],
    });
    return { volunteer: vol, assignment };
  }

  updateVolunteer(eventId, id, data) {
    const vol = this.getVolunteer(eventId, id);
    if (!vol) return null;

    // Team / role / availability / check-in live on the assignment.
    const { teamId, role, availability, checkInStatus, ...personFields } = data;
    Object.assign(vol, personFields, { updatedAt: new Date() });
    if (Array.isArray(data.skills) && !data.skillIds) {
      vol.skillIds = data.skills.map((s) => slugify(s, 'skill'));
      delete vol.skills;
    }

    if (teamId !== undefined || role !== undefined || availability !== undefined || checkInStatus !== undefined) {
      this.upsertAssignment(eventId, vol._id, {
        ...(teamId !== undefined ? { teamId: teamId || null } : {}),
        ...(role !== undefined ? { role } : {}),
        ...(availability !== undefined ? { availability } : {}),
        ...(checkInStatus !== undefined
          ? { checkedInAt: checkInStatus ? vol.checkedInAt || new Date() : null }
          : {}),
      });
    }
    return vol;
  }

  /** Removing a volunteer from an event drops their assignment. */
  deleteVolunteer(eventId, id) {
    const vol = this.getVolunteer(eventId, id);
    if (!vol) return false;
    this.assignments = this.assignments.filter(
      (a) => !(a.eventId === eventId && a.volunteerId === id)
    );
    // Only delete the person if they are in no other event.
    const elsewhere = this.assignments.some((a) => a.volunteerId === id);
    if (!elsewhere) {
      this.volunteers = this.volunteers.filter((v) => v._id !== id);
      this.tasks.forEach((t) => {
        t.assignees = (t.assignees || []).filter((a) => a !== id);
      });
    }
    return true;
  }

  // ── Tasks ─────────────────────────────────────────────────────────────────
  getTasks(eventId) {
    return this.tasks.filter((t) => t.eventId === eventId);
  }

  getTask(eventId, id) {
    return this.getTasks(eventId).find((t) => t._id === id) || null;
  }

  createTask(eventId, data) {
    const task = {
      ...data,
      _id: data._id || makeId('task'),
      eventId,
      priority: ['High', 'Medium', 'Low'].includes(data.priority) ? data.priority : 'Medium',
      status: ['Pending', 'In Progress', 'Completed'].includes(data.status) ? data.status : 'Pending',
      requiredCrew: Number(data.requiredCrew) || 4,
      assignees: Array.isArray(data.assignees) ? data.assignees : [],
      location: data.location || 'Main Stage',
      shiftStart: data.shiftStart ? new Date(data.shiftStart) : new Date(),
      shiftEnd: data.shiftEnd ? new Date(data.shiftEnd) : null,
      createdAt: data.createdAt || new Date(),
      updatedAt: new Date(),
    };
    delete task.assigneeNames;
    delete task.assignedCrewCount;
    delete task.teamName;
    delete task.shiftTime;
    delete task.shiftDate;
    return this._insert('tasks', task);
  }

  updateTask(eventId, id, data) {
    const task = this.getTask(eventId, id);
    if (!task) return null;
    return this._replace('tasks', task._id, data);
  }

  deleteTask(eventId, id) {
    const task = this.getTask(eventId, id);
    if (!task) return false;
    this.tasks = this.tasks.filter((t) => t._id !== task._id);
    return true;
  }

  // ── Users (accounts) ──────────────────────────────────────────────────────
  // Unlike the event collections these are NOT event-scoped: an account is a
  // person, and a person belongs to every event they are assigned to.

  /** Hash the demo accounts into the store the first time it is touched. */
  async _ensureUsers() {
    if (this.usersSeeded) return;
    this.usersSeeded = true;
    for (const seed of seedUsers) {
      this.users.push({
        _id: makeId('usr'),
        name: seed.name,
        email: String(seed.email).toLowerCase(),
        password: await bcrypt.hash(seed.password, SALT_ROUNDS),
        role: seed.role,
        campusOrg: seed.campusOrg,
        volunteerId: seed.volunteerId || null,
        createdAt: new Date(),
        lastLoginAt: null,
      });
    }
  }

  async findUserByEmail(email) {
    await this._ensureUsers();
    const wanted = String(email || '').toLowerCase().trim();
    return this.users.find((u) => u.email === wanted) || null;
  }

  async findUserById(id) {
    await this._ensureUsers();
    return this.users.find((u) => String(u._id) === String(id)) || null;
  }

  /** Find the volunteer person record whose email matches an account. */
  findVolunteerByEmail(email) {
    const wanted = String(email || '').toLowerCase().trim();
    return this.volunteers.find((v) => String(v.email).toLowerCase() === wanted) || null;
  }

  /** Persist the account -> volunteer link while running in fallback mode. */
  setUserVolunteerId(id, volunteerId) {
    const user = this.users.find((u) => String(u._id) === String(id));
    if (user) user.volunteerId = volunteerId || null;
    return user || null;
  }

  async countUsers() {
    await this._ensureUsers();
    return this.users.length;
  }

  /** The caller passes a plaintext password; it is hashed here, never stored raw. */
  async createUser(data) {
    await this._ensureUsers();
    const user = {
      _id: makeId('usr'),
      name: data.name || 'Coordinator',
      email: String(data.email).toLowerCase().trim(),
      password: await bcrypt.hash(String(data.password), SALT_ROUNDS),
      role: data.role || 'Volunteer',
      campusOrg: data.campusOrg || 'Student Activities Board',
      volunteerId: data.volunteerId || null,
      createdAt: new Date(),
      lastLoginAt: null,
    };
    this.users.push(user);
    return user;
  }

  async touchLastLogin(id) {
    await this._ensureUsers();
    const user = this.users.find((u) => String(u._id) === String(id));
    if (user) user.lastLoginAt = new Date();
    return user || null;
  }

  /** Hashing helper for the login route's timing equaliser. */
  async hashPassword(plain) {
    return bcrypt.hash(String(plain), SALT_ROUNDS);
  }

  /**
   * Replace mirrored accounts with authoritative MongoDB documents.
   * The caller must have selected `+password`, otherwise no account could ever
   * be signed into while the database is down.
   */
  syncUsers(docs) {
    this.usersSeeded = true;
    this.users = docs.map((d) => ({
      _id: d._id,
      name: d.name,
      email: String(d.email).toLowerCase(),
      password: d.password,
      role: d.role,
      campusOrg: d.campusOrg,
      volunteerId: d.volunteerId || null,
      createdAt: d.createdAt,
      lastLoginAt: d.lastLoginAt ?? null,
    }));
  }

  // ── Counts (for /api/system/status) ───────────────────────────────────────
  getCounts(eventId) {
    return {
      volunteers: eventId ? this.getVolunteers(eventId).length : 0,
      teams: eventId ? this.getTeams(eventId).length : 0,
      tasks: eventId ? this.getTasks(eventId).length : 0,
      events: this.events.length,
      skills: this.skills.length,
    };
  }
}

module.exports = new MemoryStore();
