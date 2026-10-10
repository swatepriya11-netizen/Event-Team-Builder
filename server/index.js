const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { connectDB, getDBStatus } = require('./config/db');
const { requireAuth } = require('./middleware/auth');
const eventsRouter = require('./routes/events');
const teamsRouter = require('./routes/teams');
const volunteersRouter = require('./routes/volunteers');
const tasksRouter = require('./routes/tasks');
const skillsRouter = require('./routes/skills');
const systemRouter = require('./routes/system');
const authRouter = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger in development
app.use((req, res, next) => {
  if (req.url.startsWith('/api')) {
    console.log(`[API] ${req.method} ${req.url}`);
  }
  next();
});

// Health route - deliberately public so uptime monitors (and the landing page's
// database pill) work without credentials. The db summary is redacted: the full
// status including the cluster URI and document counts lives behind auth on
// /api/system/status.
app.get('/api/health', (req, res) => {
  const db = getDBStatus();
  res.json({
    status: 'ok',
    service: 'Event Team Builder API',
    uptime: process.uptime(),
    db: { connected: db.connected, state: db.state, mode: db.mode }
  });
});

// API Routes
// /api/auth/login and /api/auth/register are public. Everything else requires a
// valid bearer token, so requireAuth is mounted after the auth router and before
// the data routers.
app.use('/api/auth', authRouter);
app.use('/api', requireAuth);
app.use('/api/events', eventsRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/volunteers', volunteersRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/skills', skillsRouter);
app.use('/api/system', systemRouter);

// Unknown /api/* paths must 404 as JSON. Without this, the production
// catch-all below would return the SPA HTML for a mistyped API route and the
// client's res.json() would blow up on a parse error.
app.use('/api', (req, res) => {
  res.status(404).json({ error: `API route not found: ${req.method} ${req.originalUrl}` });
});

// Serve frontend in production if built
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Start Server
app.listen(PORT, async () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Event Team Builder Server running on port ${PORT}`);
  console.log(`📡 API Endpoints available at http://localhost:${PORT}/api`);
  console.log(`======================================================\n`);

  // Attempt MongoDB Connection
  await connectDB();

  // Make sure there is always an account to sign in with.
  if (getDBStatus().connected) {
    try {
      const { ensureDemoCoordinator } = require('./seed/ensureCoordinator');
      const { created } = await ensureDemoCoordinator();
      if (created) {
        console.log('[Auth] Demo coordinator created (coordinator@campus.edu / password123)');
      }
    } catch (err) {
      console.warn('[Auth] Could not verify demo coordinator:', err.message);
    }

    // Prime the fallback store from the database and auto-seed a brand new
    // deployment, so the app is never in a half-empty state on first run.
    try {
      const { syncMirror } = require('./lib/sync');
      const Event = require('./models/Event');
      if ((await Event.estimatedDocumentCount()) === 0) {
        console.log('[Boot] Empty database detected - seeding demo events...');
        const { seedAll } = require('./seed/seedService');
        await seedAll();
      }
      await syncMirror();
      console.log('[Boot] Fallback store synced from MongoDB');
    } catch (err) {
      console.warn('[Boot] Fallback sync skipped:', err.message);
    }
  }
});
