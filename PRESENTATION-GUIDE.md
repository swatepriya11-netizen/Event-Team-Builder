# Event Team Builder — Presentation Roadmap

**Read this section first.** Everything below is ordered so you can stop reading at any depth and still have a complete answer.

---

## How to use this document

| If you have… | Read… |
|---|---|
| 5 minutes | Part 1 (roadmap) + Part 2 (the one picture) |
| 30 minutes | Parts 1–4 |
| 2 hours | Everything, plus Appendix B (code-reading order) |

**The structure of this document is deliberate.** Each part builds on the one before it. Part 2 is a single diagram. Part 3 explains the same system in six layers of increasing depth. You can always drop down a layer when someone asks a follow-up, then come back up.

---

# Part 1 — Your roadmap for tomorrow

## The 12-minute script

| Time | Say this | Show this |
|---|---|---|
| **0:00–1:00** | What it is: a multi-event volunteer staffing manager. The hard part isn't the CRUD, it's letting one volunteer work several events without their data overwriting. | The app, event switcher in the navbar |
| **1:00–2:00** | The domain in one picture — 7 collections, and the relationship that matters. | **Part 2 diagram** |
| **2:00–5:00** | The key design decision: why `assignments` is a separate collection. Walk through the Ahmed example. | Assign the same volunteer to both events live |
| **5:00–7:00** | Two design rules that follow from it: nothing computed is stored; correctness is enforced by indexes. | `views.js`, the unique index |
| **7:00–9:00** | Security: bcrypt cost 12, JWT, role guards, the timing trick. | Nothing — talk, don't click |
| **9:00–11:00** | A real bug I found and fixed — the reconnect one. This is the credibility moment. | Nothing |
| **11:00–12:00** | What I'd improve. | Nothing |

## Three moments that land well

1. **The Ahmed example** (2:00–5:00) — the moment you explain *why* normalization was necessary, not just that you did it.
2. **The reconnect bug** (9:00–11:00) — shows you debugged rather than just wrote code.
3. **Volunteering a limitation** — saying "the UI wasn't visually tested, only the API" reads as honesty. Saying "fully tested" invites a demo you can't back up.

## If you get only one question

> "Why is `assignments` a separate collection instead of storing the team on the volunteer?"

That is the question your whole schema exists to answer. **Part 3, Layer 3** has the answer ready.

---

# Part 2 — The one picture

## How the collections relate

```
                            ┌───────────────────┐
                            │      events       │
                            │  _id: evt-…       │
                            │  isActive         │
                            └───┬───────────┬───┘
              ┌─────────────────┘           └──────────────┐
              │ 1                                        │ 1
              │                                          │
      ┌───────▼────────┐                        ┌────────▼───────┐
      │     teams      │                        │      tasks      │
      │  eventId ──────┼──► belongs to          │   eventId ──────┼──► belongs to
      │  code          │                        │   shiftStart    │
      │  leadVolunteerId ──┐                    │   requiredCrew  │
      └───────┬────────┘   │                    │   assignees[] ──┼──┐
              │ 1          │                    └────────┬────────┘  │
              │            │                             │           │
              │            │                             │ N         │ N
              │            │                             │           │
              │            │                    ┌────────▼────────┐  │
              │            └───────────────────►│   assignments   │  │
              │              1        N         │  eventId        │  │
              │            lead       enrolls    │  volunteerId ───┼──┼──┐
              │                                     │  teamId (null) │  │
              └────────────────────────────────────►│  role          │  │
                                    N              │  checkedInAt   │  │
                                                   └────────────────┘  │
                                                                          │
      ┌───────────────────────────────────────────────────────────────────┘
      │
      │  N
┌─────▼───────────┐        skillIds[]        ┌──────────────┐
│   volunteers    │─────────────────────────►│    skills     │
│ _id: vol-…      │         N                │ _id: "photo…" │
│ name, email     │                          │ name, category│
│ (GLOBAL person) │                          │ (no index     │
└─────────────────┘                          │  needed!)     │
                                               └──────────────┘

      ┌───────────────────┐
      │      users        │   ← sign-in only. Separate from volunteers,
      │  _id: usr-…       │     because a coordinator manages events
      │  password (hash)  │     without volunteering at them.
      │  role             │
      └───────────────────┘   NOT referenced by any other collection.
```

## The relationships in words

| Relationship | Type | How it is stored |
|---|---|---|
| Event → Teams | one-to-many | `teams.eventId` |
| Event → Tasks | one-to-many | `tasks.eventId` |
| Event → Assignments | one-to-many | `assignments.eventId` |
| Team → Assignments | one-to-many | `assignments.teamId` |
| Volunteer → Assignments | one-to-many | `assignments.volunteerId` |
| Team → Lead | many-to-one | `teams.leadVolunteerId` |
| Volunteer ↔ Skills | many-to-many | `volunteers.skillIds[]` (embedded) |
| Task ↔ Volunteers | many-to-many | `tasks.assignees[]` (embedded) |
| Users | standalone | not referenced by anything |

## The one rule that explains the whole schema

> **If a fact is about the *person*, it goes on `volunteers`.
> If it is about the person *at a particular event*, it goes on `assignments`.**

Everything else follows from this. `teamId`, `role`, `availability` and `checkedInAt` are all event-specific, so they all live on `assignments`. `name`, `email`, `phone` and `skills` belong to the human being, so they live on `volunteers`.

---

# Part 3 — The same system in six layers

Read top to bottom. Stop at whatever depth the question requires.

---

### Layer 1 — What the app does *(30 seconds)*

A coordinator creates events. For each event they build teams, enrol volunteers onto those teams, and create shift tasks. Volunteers can work several events. Coordinators and volunteers see different things.

**Say this:** *"The CRUD is standard. The interesting part is the data model, because the app has to support many events with the same volunteers."*

---

### Layer 2 — The collections *(2 minutes)*

Seven collections. Read the diagram in Part 2.

The only one you must explain in depth is `assignments` — that is Layer 3.

**What each is, in one line each:**

- `events` — the parent. Exactly one has `isActive: true`.
- `skills` — a global list ("Photography", "First Aid"). Its `_id` *is* the slugified name.
- `volunteers` — global people. Note what is **missing** from them.
- `teams` — groups belonging to exactly one event.
- `assignments` — who is on which team for which event.
- `tasks` — shift work, with a small embedded list of assignees.
- `users` — login accounts only, separate from volunteers.

---

### Layer 3 — The key design decision *(2 minutes — the most important slide)*

**The problem.** A volunteer needs a team. So the obvious move is to put `teamId` on the volunteer.

**Why that breaks.** Ahmed joins the Media team for Aurelia. Then he joins the Arts team for Spring Arts. With one `teamId` field, **the second save overwrites the first** — he is silently dropped from Aurelia, and nothing warns you.

**The alternative that fails too.** Give him a field per event: `aureliaTeam`, `springTeam`, `nextEventTeam`. Now you redesign the database every time an event is added.

**The fix.** A separate `assignments` collection — a sign-up sheet, one row per person per event:

```
eventId      | volunteerId | teamId     | role
-------------+-------------+------------+------------------
aurelia-2026 | vol-ahmed   | team-media | Photographer
aurelia-2026 | vol-fatima  | team-media | Designer
spring-2027  | vol-ahmed   | team-arts  | General Crew   ← same person, new row
```

Ahmed appears twice. **That is the entire point.** One person can work any number of events, and adding an event never requires a schema change.

**Enforce it in the database, not in code:**

```js
AssignmentSchema.index({ eventId: 1, volunteerId: 1 }, { unique: true });
```

A person cannot sign up for the same event twice — rejected by MongoDB itself (`E11000`), not by an `if (!exists)` check someone could forget.

**Bonus detail:** `teamId: null` is meaningful, not missing data. It means "signed up but not placed yet" — the app calls this the **Ready pool**.

**If they push further** — *"why not just embed assignments inside the volunteer?"* Because then you cannot ask "everyone on the Media team" or "everyone who has not been checked in" without loading every volunteer document and filtering in application code.

---

### Layer 4 — Two rules that follow *(2 minutes)*

#### Rule A — Never store what you can compute

**Problem.** The screen needs `assigneeNames: ["Maria Silva", "James Okafor"]`. The database stores ids. The old fix copied names onto records at save time — which drifts. Rename Maria, and every task still shows the old name.

**Fix.** Compute at read time in `server/lib/views.js`:

```js
function buildTaskViews(tasks, { volunteers = [], teams = [] } = {}) {
  const volunteerById = indexBy(volunteers);      // phonebook, built once
  return tasks.map((task) => {
    const names = task.assignees
      .map((id) => volunteerById.get(String(id))?.name)
      .filter(Boolean);
    return { ...task, assigneeNames: names };
  });
}
```

Rename a volunteer once → every task listing them updates instantly. One source of truth.

My test suite asserts exactly this: *"task roster shows the NEW name automatically."*

**When to store vs compute:** store facts (`shiftStart`, `requiredCrew`); compute anything derivable (`assigneeNames`, `status`, `dates`, `assignedCrewCount`).

#### Rule B — Let the database enforce correctness

Four unique indexes carry real business rules:

| Index | Rule it enforces |
|---|---|
| `assignments: {eventId, volunteerId}` unique | no double sign-up for one event |
| `teams: {eventId, code}` unique | no duplicate team codes within an event |
| `volunteers: {email}` unique | no duplicate people |
| `events: {slug}` unique | no duplicate event slugs |

**The subtlety worth highlighting:** the teams index is *compound* — `{eventId, code}`, not just `{code}`. So two different events can each have a team called `media`. That is intentional.

---

### Layer 5 — Security *(1 minute)*

| Concern | What was done |
|---|---|
| Password storage | `bcrypt`, cost 12, per-user salt, never reversible |
| Forgetting to hash | A `pre('save')` hook hashes automatically — it cannot be skipped |
| Leaking hashes | `password: { select: false }` — excluded from every query unless explicitly requested |
| Session management | JWT, 7-day expiry, signature verified on every request |
| Stale permissions | `requireAuth` re-fetches the user each request, so role changes apply immediately |
| Brute force | Per-IP throttle: 30 attempts / 10 minutes |
| Account enumeration | Unknown emails still burn a full bcrypt hash, so response time is identical |
| Authorisation | `requireRole('Coordinator')` guards destructive routes → 403 |
| Log safety | URIs are masked (`****`) in every log line and API response |

**The two status codes, if asked:** `401` = *who are you?* (not signed in). `403` = *I know who you are, but you may not do this.*

---

### Layer 6 — What broke, and how I found it *(2 minutes — your credibility section)*

**The bug worth telling.** After switching to MongoDB Atlas, `/api/health` reported `connected: true` while the app was actually serving and **writing data into memory**. Changes vanished on restart. The API even emitted the self-contradictory `{"connected": false, "state": "connected"}`.

**Root cause.** `isConnected` was set once at startup and never updated when the MongoDB driver reconnected on its own after a transient blip.

**The fix.**

```js
mongoose.connection.on('connected', () => {
  const wasDown = hasConnectedOnce && !isConnected;
  isConnected = true;
  hasConnectedOnce = true;
  if (wasDown) {
    console.log('[MongoDB] Reconnected');
    require('../lib/sync').syncMirror();   // refresh the in-memory mirror
  }
});
```

Plus: status derived rather than cached, a 15-second background retry, and mirror re-sync on reconnect.

**Other bugs fixed** — mention briefly if asked:

| Bug | Impact |
|---|---|
| Auth threw a 500 on every request when MongoDB was down, while health said "100% operational" | total outage, silently misreported |
| `POST /system/connect-mongodb` returned HTTP 200 "successfully connected" while logging out every user | sessions died with an unexplained 401 |
| Adding the same skill twice forked it into `pyrotechnics-2` | duplicate data |
| A missing `Task` import deleted a record *then* threw | partial write, HTTP 500 |
| Settings form never loaded async data | saving one event's details onto another |

That last class of bug motivated a static checker, `lint-undefined.js`, which flags identifiers that are used but never imported. It now passes across all 26 server files.

---

# Part 4 — Code segments, annotated

### 4.1 `server/lib/eventScope.js` — which event is this request about?

```js
async function resolveEventId(req) {
  const explicit = (req.query && req.query.eventId) || req.headers['x-event-id'];
  if (explicit) return String(explicit);

  const fallback = await getDefaultEvent();
  return fallback ? fallback._id : null;
}
```

**In English:** use the event the client asked for (URL first, then header); if they asked for nothing, use whichever event is active.

**Why it is its own file:** every route needs this. Left to each route, one would eventually forget — and that route would show or edit the wrong event's data. One shared function makes forgetting impossible.

**The safety rule:** on create requests, any `eventId` in the request **body** is deleted before saving. Only trusted sources may decide where data lands.

### 4.2 `server/middleware/auth.js` — the guard on every protected route

```js
async function requireAuth(req, res, next) {
  const token = extractToken(req);
  if (!token) return res.status(401).json({ error: 'Authentication required' });

  const payload = jwt.verify(token, getSecret());   // genuine and unexpired
  const user = await findAccount(payload.sub);      // does the account still exist?
  if (!user) return res.status(401).json({ error: 'Account no longer exists' });

  req.user = toPublicUser(user);
  next();                                            // pass to the real route
}
```

**`next()` is the concept to understand.** In Express, middleware either sends a response (blocking the request) or calls `next()` to hand it to the next handler. A guard that forgets to do either hangs the request forever.

**Why re-fetch the user every time?** It looks wasteful, but it means deleting an account or changing a role takes effect immediately rather than in seven days.

**Why that caused the Atlas bug:** account ids are per-database, so a token minted against Atlas fails with `401 Account no longer exists` once the process points somewhere else. The endpoint now returns `sessionInvalidated` and the client ends the session cleanly.

### 4.3 The timing-equaliser

```js
/** Burn roughly one bcrypt's worth of time, so a miss looks like a wrong password. */
async function hashEqualiser(connected) {
  if (connected) await User.hashPassword('timing-equalizer');
  else await memoryStore.hashPassword('timing-equalizer');
}
```

Unknown email fails instantly; wrong password takes ~250 ms. That gap lets an attacker enumerate which emails are registered. So on a failed lookup the app does the work anyway — both paths now take the same time.

### 4.4 `server/lib/ids.js` — why String ids

> *"Cross-collection type mismatches cannot occur because they are all the same type."*

```js
function slugify(value, fallback = 'item') {
  return String(value ?? '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')    // "Café" → "cafe"
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || fallback;
}
```

**The concrete failure it prevents:** Mongoose's `populate()` **silently returns `null`** when given an ObjectId for a String field. No error, no warning — just missing data that is hard to trace. Every `_id` being a String makes that impossible.

---

# Part 5 — Questions you will probably get

**"Walk me through your schema."**
Seven collections; the point is that `Assignment` is a join collection, not embedded. See Part 2.

**"Why String `_id` instead of ObjectId?"**
So a reference can never type-mismatch its target. `populate()` fails silently on a mismatch; making all ids Strings removes the failure mode. Also keeps ids readable.

**"How does the app know which event?"**
Query param → `x-event-id` header → active event → earliest by `startsAt`. Centralised so no route can forget it.

**"How are passwords stored?"**
bcrypt cost 12, salted per user, never reversible. Automatic via a `pre('save')` hook. Plus a timing-equaliser and a per-IP throttle.

**"What if MongoDB goes down?"**
It degrades to an in-memory mirror rather than crashing, and reports `mode: fallback-local` honestly. This is where the reconnect bug lived.

**"Why Atlas over local?"**
Cloud-hosted, no install — and *harder* than local: Atlas is sharded and requires auth, while the dev server was a standalone with no auth. It exposed a real session bug immediately.

**"Why no transactions?"**
None are needed. Every write touches a single document; no operation needs multi-document atomicity.

**"Why not store computed fields?"**
They would drift. Computing at read time keeps one source of truth — proven by the rename test.

**"What would you improve?"**
No password-reset or account-deletion flow. The throttle is per-process, so it resets on restart and won't work across instances (needs Redis). `cors()` is open. Tests aren't committed to the project. No `.gitignore`, and `.env` holds a real password. The Atlas user has `atlasAdmin` where `readWriteAnyDatabase` would do.

---

# Part 6 — Do not claim these

- **That the UI was visually tested.** No Playwright or Puppeteer here; all 166 checks drive the API. Say: *"I tested the API end-to-end; I had not set up browser automation."*
- **That the database is fully secured.** The Atlas user has `atlasAdmin`.
- **Any transaction or ACID guarantee.**

---

# Appendix A — Index reference

| Collection | Index | Purpose |
|---|---|---|
| `events` | `slug_1` **(unique)** | no duplicate event slugs |
| `events` | `isActive_1` | find the active event quickly |
| `skills` | *(none needed)* | `_id` **is** the slugified name |
| `volunteers` | `email_1` **(unique)** | no duplicate people |
| `teams` | `eventId_1_code_1` **(unique)** | no duplicate codes per event |
| `teams` | `eventId_1` | event scoping |
| `assignments` | `eventId_1_volunteerId_1` **(unique)** | no double sign-up |
| `assignments` | `eventId_1_teamId_1` | "everyone on this team" |
| `tasks` | `eventId_1_shiftStart_1` | upcoming shifts |
| `tasks` | `eventId_1_teamId_1_status_1` | a team's open work |
| `users` | `email_1` **(unique)** | no duplicate accounts |

None need creating manually — Mongoose builds them on connect. Verify with `npm run db:verify`.

---

# Appendix B — Code-reading order

If you need to revise the code itself, read it in this order. Each file assumes the previous one.

| # | File | Lines | What it teaches you |
|---|---|---|---|
| 1 | `server/index.js` | — | how everything wires together |
| 2 | `server/models/*.js` | ~440 | the data shape and all index rules |
| 3 | `server/lib/eventScope.js` | 53 | the event-scoping rule everything depends on |
| 4 | `server/lib/views.js` | 141 | why nothing computed is stored |
| 5 | `server/middleware/auth.js` | 84 | the auth guard and role checks |
| 6 | `server/config/db.js` | 133 | connection, reconnect, fallback |
| 7 | `server/routes/*.js` | ~1,360 | the endpoints |
| 8 | `server/store/memoryStore.js` | 426 | how the app survives an outage |
| 9 | `client/src/services/api.js` | — | the client's view of the API |

**Total server: ~2,800 lines across 20 files.**

---

# Appendix C — Thirty-second summary

> Volunteers are global — a person exists once. But a volunteer's team, role and check-in status are specific to one event, so those live in a separate `assignments` collection: one row per person per event. That is what lets one volunteer work several events without overwriting anything. To keep it correct I put a unique index on `{eventId, volunteerId}`, so the database itself prevents duplicate sign-ups. Anything the screen needs but should not store — team names, assignee names, Ready vs Assigned — is computed at read time rather than copied, so there is only ever one version of the truth.

---

# Appendix D — Running it

| | |
|---|---|
| **Frontend** | http://localhost:3000 |
| **API** | http://localhost:5000/api |
| **Database** | MongoDB Atlas — `cluster0.nbyegj6.mongodb.net` → `event-team-builder` |
| **Login** | `coordinator@campus.edu` / `password123` |

```bash
npm run dev          # frontend + API
npm run db:verify    # check the database: auth, privileges, collections, indexes
npm run seed         # reload the demo dataset (keeps sign-in accounts)
```

**Tests:** 166 checks passing — 64 schema, 50 multi-event e2e, 52 auth.
