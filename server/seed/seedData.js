/**
 * Seed data for two events, so the multi-event model is exercised from the
 * moment you start the app.
 *
 * Ids are stable and readable so the data is legible when inspected directly.
 * Cross-document links are made with those ids (assignments.teamId,
 * tasks.assignees) rather than being duplicated as display strings.
 *
 * Passwords below are hashed by the User model's pre-save hook before they
 * reach the database - they are never stored as plaintext.
 */

// ── Skills ──────────────────────────────────────────────────────────────────
// _id is the slug, so references are readable AND exact.
const skills = [
  { name: 'Sound Engineering', category: 'Technical' },
  { name: 'Lighting Design', category: 'Technical' },
  { name: 'Stage Management', category: 'Operations' },
  { name: 'Photography', category: 'Creative' },
  { name: 'Graphic Design', category: 'Creative' },
  { name: 'Social Media', category: 'Creative' },
  { name: 'Catering', category: 'Hospitality' },
  { name: 'Hospitality', category: 'Hospitality' },
  { name: 'Guest Experience', category: 'Hospitality' },
  { name: 'First Aid', category: 'Safety' },
  { name: 'Crowd Management', category: 'Safety' },
  { name: 'Logistics', category: 'Operations' },
  { name: 'Set Build', category: 'Operations' },
  { name: 'Volunteer Coordination', category: 'Operations' },
  { name: 'Yoga & Wellness', category: 'General' },
];

// Slugs must match what Skill.pre('validate') derives, so the seed can rely on
// them without duplicating the slugify logic.
const slug = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const skillId = (name) => slug(name);

// ── Events ──────────────────────────────────────────────────────────────────
const events = [
  {
    _id: 'evt-aurelia-cultural-fest-2026',
    name: 'Aurelia Cultural Fest ’26',
    slug: 'aurelia-cultural-fest-2026',
    kicker: 'BUILT FOR CAMPUS CREWS',
    description:
      'Annual flagship inter-campus arts, music, and cultural celebration hosting 3,500+ attendees.',
    startsAt: new Date('2026-09-18T09:00:00Z'),
    endsAt: new Date('2026-09-20T23:00:00Z'),
    venue: {
      name: 'Grand Arena',
      address: 'North Quad & Campus Plaza',
      city: 'Aurelia campus',
    },
    status: 'Live',
    isActive: true,
    targets: { activeVolunteers: 45, teams: 4 },
    settings: {
      autoMatching: true,
      shiftAlertLeadMinutes: 120,
      coordinatorEditing: true,
    },
  },
  {
    _id: 'evt-spring-arts-week-2027',
    name: 'Spring Arts Week ’27',
    slug: 'spring-arts-week-2027',
    kicker: 'SEVEN DAYS OF CREATIVE WORK',
    description:
      'A week-long showcase of student theatre, dance, and visual art across every studio on campus.',
    startsAt: new Date('2027-03-08T10:00:00Z'),
    endsAt: new Date('2027-03-14T22:00:00Z'),
    venue: {
      name: 'Performing Arts Centre',
      address: '18 Halloway Lane',
      city: 'Aurelia campus',
    },
    status: 'Planning',
    isActive: false,
    targets: { activeVolunteers: 30, teams: 2 },
    settings: {
      autoMatching: true,
      shiftAlertLeadMinutes: 180,
      coordinatorEditing: true,
    },
  },
];

// ── Volunteers (people, shared across events) ───────────────────────────────
const volunteers = [
  { _id: 'vol-1', name: 'Ananya Shah', email: 'ananya.shah@campus.edu', phone: '+1 (555) 201-3344', skillIds: ['photography', 'social-media', 'graphic-design'], avatarColor: '#a855f7' },
  { _id: 'vol-2', name: 'Dev Patel', email: 'dev.patel@campus.edu', phone: '+1 (555) 201-8871', skillIds: ['sound-engineering', 'lighting-design'], avatarColor: '#38bdf8' },
  { _id: 'vol-3', name: 'Maya Sen', email: 'maya.sen@campus.edu', phone: '+1 (555) 201-2244', skillIds: ['stage-management', 'set-build'], avatarColor: '#f472b6' },
  { _id: 'vol-4', name: 'Rohan Kapoor', email: 'rohan.kapoor@campus.edu', phone: '+1 (555) 201-6620', skillIds: ['hospitality', 'guest-experience'], avatarColor: '#fb923c' },
  { _id: 'vol-5', name: 'Aarav Menon', email: 'aarav.menon@campus.edu', phone: '+1 (555) 201-9913', skillIds: ['crowd-management', 'first-aid'], avatarColor: '#34d399' },
  { _id: 'vol-6', name: 'Priya Sharma', email: 'priya.sharma@campus.edu', phone: '+1 (555) 201-7788', skillIds: ['catering', 'hospitality'], avatarColor: '#f87171' },
  { _id: 'vol-7', name: 'Arjun Verma', email: 'arjun.verma@campus.edu', phone: '+1 (555) 201-5540', skillIds: ['set-build', 'logistics'], avatarColor: '#a3e635' },
  { _id: 'vol-8', name: 'Neha Gupta', email: 'neha.gupta@campus.edu', phone: '+1 (555) 201-1234', skillIds: ['guest-experience', 'hospitality'], avatarColor: '#22d3ee' },
  { _id: 'vol-9', name: 'Kabir Joshi', email: 'kabir.joshi@campus.edu', phone: '+1 (555) 201-4455', skillIds: ['sound-engineering', 'stage-management'], avatarColor: '#c084fc' },
  { _id: 'vol-10', name: 'Ishita Rao', email: 'ishita.rao@campus.edu', phone: '+1 (555) 201-9090', skillIds: ['graphic-design', 'photography'], avatarColor: '#fbbf24' },
  { _id: 'vol-11', name: 'Vikram Rao', email: 'vikram.rao@campus.edu', phone: '+1 (555) 201-3366', skillIds: ['logistics', 'crowd-management'], avatarColor: '#4ade80' },
  { _id: 'vol-12', name: 'Sara Ahmed', email: 'sara.ahmed@campus.edu', phone: '+1 (555) 201-1122', skillIds: ['volunteer-coordination', 'first-aid'], avatarColor: '#60a5fa' },

  // Second event has its own volunteers, which is the point: two events can hold
  // entirely separate crews.
  { _id: 'vol-20', name: 'Leila Haddad', email: 'leila.haddad@campus.edu', phone: '+1 (555) 401-2200', skillIds: ['stage-management', 'volunteer-coordination'], avatarColor: '#f472b6' },
  { _id: 'vol-21', name: 'Tom Okafor', email: 'tom.okafor@campus.edu', phone: '+1 (555) 401-7712', skillIds: ['lighting-design', 'set-build'], avatarColor: '#38bdf8' },
  { _id: 'vol-22', name: 'Yuki Tanaka', email: 'yuki.tanaka@campus.edu', phone: '+1 (555) 401-5540', skillIds: ['photography', 'graphic-design'], avatarColor: '#a855f7' },
];

// ── Teams (scoped to an event) ──────────────────────────────────────────────
const teams = [
  { _id: 'team-stage-ops', eventId: 'evt-aurelia-cultural-fest-2026', name: 'Stage operations', code: 'stage-ops', description: 'Mainstage audio, dynamic lighting, performer hospitality & cue execution.', color: '#22c55e', leadVolunteerId: 'vol-3', requiredSkillIds: ['sound-engineering', 'lighting-design', 'stage-management'], targetCapacity: 10 },
  { _id: 'team-guest-exp', eventId: 'evt-aurelia-cultural-fest-2026', name: 'Guest experience', code: 'guest-exp', description: 'Front-of-house welcome desk, badge collection, wayfinding and audience flow.', color: '#38bdf8', leadVolunteerId: 'vol-4', requiredSkillIds: ['hospitality', 'guest-experience'], targetCapacity: 8 },
  { _id: 'team-media-team', eventId: 'evt-aurelia-cultural-fest-2026', name: 'Media team', code: 'media-team', description: 'Live photography, social coverage, and same-night highlight edits.', color: '#a855f7', leadVolunteerId: 'vol-1', requiredSkillIds: ['photography', 'graphic-design', 'social-media'], targetCapacity: 6 },
  { _id: 'team-logistics', eventId: 'evt-aurelia-cultural-fest-2026', name: 'Logistics & safety', code: 'logistics', description: 'Load-in scheduling, equipment staging, first-aid tent and crowd marshalling.', color: '#f59e0b', leadVolunteerId: 'vol-5', requiredSkillIds: ['logistics', 'first-aid', 'crowd-management'], targetCapacity: 8 },

  { _id: 'team-arts-production', eventId: 'evt-spring-arts-week-2027', name: 'Arts production', code: 'arts-production', description: 'Runs the technical build and get-out across all seven days.', color: '#22c55e', leadVolunteerId: 'vol-20', requiredSkillIds: ['stage-management', 'set-build', 'lighting-design'], targetCapacity: 12 },
  { _id: 'team-arts-media', eventId: 'evt-spring-arts-week-2027', name: 'Arts media', code: 'arts-media', description: 'Documentation, programme design and social coverage.', color: '#a855f7', leadVolunteerId: 'vol-22', requiredSkillIds: ['photography', 'graphic-design'], targetCapacity: 6 },
];

// ── Assignments (volunteer <-> event, optionally on a team) ──────────────────
const assignments = [
  // Aurelia 2026
  { _id: 'asg-1', eventId: 'evt-aurelia-cultural-fest-2026', volunteerId: 'vol-3', teamId: 'team-stage-ops', role: 'Team Lead', availability: ['Morning', 'Evening'] },
  { _id: 'asg-2', eventId: 'evt-aurelia-cultural-fest-2026', volunteerId: 'vol-9', teamId: 'team-stage-ops', role: 'Sound Technician', availability: ['Morning'] },
  { _id: 'asg-3', eventId: 'evt-aurelia-cultural-fest-2026', volunteerId: 'vol-2', teamId: null, role: 'Sound Engineer', availability: ['Evening'] },
  { _id: 'asg-4', eventId: 'evt-aurelia-cultural-fest-2026', volunteerId: 'vol-4', teamId: 'team-guest-exp', role: 'Team Lead', availability: ['Morning', 'All Day'] },
  { _id: 'asg-5', eventId: 'evt-aurelia-cultural-fest-2026', volunteerId: 'vol-8', teamId: 'team-guest-exp', role: 'Front of House', availability: ['Morning'] },
  { _id: 'asg-6', eventId: 'evt-aurelia-cultural-fest-2026', volunteerId: 'vol-6', teamId: 'team-guest-exp', role: 'Refreshments', availability: ['All Day'] },
  { _id: 'asg-7', eventId: 'evt-aurelia-cultural-fest-2026', volunteerId: 'vol-1', teamId: 'team-media-team', role: 'Team Lead', availability: ['Evening'] },
  { _id: 'asg-8', eventId: 'evt-aurelia-cultural-fest-2026', volunteerId: 'vol-10', teamId: 'team-media-team', role: 'Designer', availability: ['Morning', 'Evening'] },
  { _id: 'asg-9', eventId: 'evt-aurelia-cultural-fest-2026', volunteerId: 'vol-5', teamId: 'team-logistics', role: 'Team Lead', availability: ['All Day'] },
  { _id: 'asg-10', eventId: 'evt-aurelia-cultural-fest-2026', volunteerId: 'vol-11', teamId: 'team-logistics', role: 'Logistics Runner', availability: ['Morning'] },
  { _id: 'asg-11', eventId: 'evt-aurelia-cultural-fest-2026', volunteerId: 'vol-7', teamId: 'team-logistics', role: 'Stage Build', availability: ['Morning', 'Evening'] },
  { _id: 'asg-12', eventId: 'evt-aurelia-cultural-fest-2026', volunteerId: 'vol-12', teamId: null, role: 'Volunteer Coordinator', availability: ['All Day'] },

  // Spring Arts Week 2027 - same app, completely separate data.
  { _id: 'asg-20', eventId: 'evt-spring-arts-week-2027', volunteerId: 'vol-20', teamId: 'team-arts-production', role: 'Team Lead', availability: ['All Day'] },
  { _id: 'asg-21', eventId: 'evt-spring-arts-week-2027', volunteerId: 'vol-21', teamId: 'team-arts-production', role: 'Technical Director', availability: ['All Day'] },
  { _id: 'asg-22', eventId: 'evt-spring-arts-week-2027', volunteerId: 'vol-22', teamId: 'team-arts-media', role: 'Team Lead', availability: ['Morning', 'Evening'] },
];

// ── Tasks & shifts (scoped to an event, assignees referenced by id) ─────────
const tasks = [
  { _id: 'task-1', eventId: 'evt-aurelia-cultural-fest-2026', teamId: 'team-stage-ops', title: 'Stage setup & PA line check', description: 'Position modular drum riser, mount front-of-house PA speakers, and test DI boxes.', shiftStart: new Date('2026-09-19T09:30:00Z'), shiftEnd: new Date('2026-09-19T13:00:00Z'), priority: 'High', status: 'Completed', requiredCrew: 8, assignees: ['vol-3', 'vol-9', 'vol-7'], location: 'Main Stage' },
  { _id: 'task-2', eventId: 'evt-aurelia-cultural-fest-2026', teamId: 'team-guest-exp', title: 'Guest services desk open', description: 'Staff the welcome desk, issue badges, and manage the queue for afternoon acts.', shiftStart: new Date('2026-09-19T12:00:00Z'), shiftEnd: new Date('2026-09-19T18:00:00Z'), priority: 'High', status: 'In Progress', requiredCrew: 5, assignees: ['vol-4', 'vol-8', 'vol-6'], location: 'North Gate' },
  { _id: 'task-3', eventId: 'evt-aurelia-cultural-fest-2026', teamId: 'team-media-team', title: 'Live photo coverage — afternoon acts', description: 'Shoot the full afternoon block; deliver selects to the media desk every hour.', shiftStart: new Date('2026-09-19T14:00:00Z'), shiftEnd: new Date('2026-09-19T20:00:00Z'), priority: 'Medium', status: 'In Progress', requiredCrew: 3, assignees: ['vol-1', 'vol-10'], location: 'Studio B' },
  { _id: 'task-4', eventId: 'evt-aurelia-cultural-fest-2026', teamId: 'team-logistics', title: 'Emergency medical staging coordination', description: 'Audit first-aid tent inventory, AED accessibility, and establish the direct-report line.', shiftStart: new Date('2026-09-19T08:00:00Z'), shiftEnd: new Date('2026-09-19T22:00:00Z'), priority: 'High', status: 'In Progress', requiredCrew: 4, assignees: ['vol-5', 'vol-11'], location: 'First Aid Tent' },
  { _id: 'task-5', eventId: 'evt-aurelia-cultural-fest-2026', teamId: 'team-stage-ops', title: 'Lighting cue rehearsal', description: 'Full cue-to-cue run with the LD; lock the house state before doors.', shiftStart: new Date('2026-09-20T10:00:00Z'), shiftEnd: new Date('2026-09-20T14:00:00Z'), priority: 'High', status: 'Pending', requiredCrew: 5, assignees: ['vol-9'], location: 'Main Stage' },
  { _id: 'task-6', eventId: 'evt-aurelia-cultural-fest-2026', teamId: 'team-guest-exp', title: 'Accessibility support desk', description: 'Companion seating, BSL interpretation liaison, and step-free route guidance.', shiftStart: new Date('2026-09-20T10:00:00Z'), shiftEnd: new Date('2026-09-20T18:00:00Z'), priority: 'Medium', status: 'Pending', requiredCrew: 3, assignees: [], location: 'Grand Arena Foyer' },
  { _id: 'task-7', eventId: 'evt-aurelia-cultural-fest-2026', teamId: 'team-logistics', title: 'Get-out & load-in reversal', description: 'Strike the stage, return PA to store, and clear the plaza for the next build.', shiftStart: new Date('2026-09-20T19:00:00Z'), shiftEnd: new Date('2026-09-20T23:30:00Z'), priority: 'Low', status: 'Pending', requiredCrew: 6, assignees: ['vol-7', 'vol-11'], location: 'Main Stage' },
  { _id: 'task-8', eventId: 'evt-aurelia-cultural-fest-2026', teamId: 'team-media-team', title: 'Same-night highlight edit', description: 'Cut a 90-second vertical highlight reel and schedule it for the morning feed.', shiftStart: new Date('2026-09-19T22:00:00Z'), shiftEnd: new Date('2026-09-20T01:00:00Z'), priority: 'Low', status: 'Pending', requiredCrew: 2, assignees: ['vol-10'], location: 'Media Desk' },

  // Spring Arts Week 2027
  { _id: 'task-30', eventId: 'evt-spring-arts-week-2027', teamId: 'team-arts-production', title: 'Studio build — week one', description: 'Rig the thrust stage and masking for the opening dance piece.', shiftStart: new Date('2027-03-08T09:00:00Z'), shiftEnd: new Date('2027-03-08T17:00:00Z'), priority: 'High', status: 'Pending', requiredCrew: 10, assignees: ['vol-20', 'vol-21'], location: 'PAC Studio 1' },
  { _id: 'task-31', eventId: 'evt-spring-arts-week-2027', teamId: 'team-arts-media', title: 'Programme photography', description: 'Capture set-build progress and the first full technical run.', shiftStart: new Date('2027-03-09T10:00:00Z'), shiftEnd: new Date('2027-03-09T16:00:00Z'), priority: 'Medium', status: 'Pending', requiredCrew: 2, assignees: ['vol-22'], location: 'PAC Studio 2' },
];

// ── Auth users (separate concern from event data) ───────────────────────────
const users = [
  {
    email: 'coordinator@campus.edu',
    name: 'Inaamul haq A M',
    password: 'password123',
    role: 'Coordinator',
    campusOrg: 'Student Cultural Board',
  },
  {
    // Volunteer demo account. Linked to vol-1 (Ananya Shah), who leads the
    // Media team at Aurelia and is assigned to a task, so the restricted portal
    // has something real to show.
    email: 'ananya.shah@campus.edu',
    name: 'Ananya Shah',
    password: 'password123',
    role: 'Volunteer',
    volunteerId: 'vol-1',
    campusOrg: 'Student Cultural Board',
  },
];

module.exports = {
  events,
  skills,
  volunteers,
  teams,
  assignments,
  tasks,
  users,

  // Back-compat aliases so older imports do not explode.
  initialEvent: events[0],
  initialTeams: teams,
  initialVolunteers: volunteers,
  initialTasks: tasks,
  initialUsers: users,
  DEMO_LOGIN: { email: users[0].email, password: users[0].password },
  DEMO_VOLUNTEER_LOGIN: { email: users[1].email, password: users[1].password },
};
