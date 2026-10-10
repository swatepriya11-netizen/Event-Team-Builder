const mongoose = require('mongoose');
const { connectDB } = require('../config/db');
const { seedAll, summarise } = require('./seedService');
const { ensureDemoCoordinator } = require('./ensureCoordinator');

async function runSeed() {
  console.log('[Seed] Connecting to MongoDB...');
  const res = await connectDB();
  if (!res.success) {
    console.error('[Seed] Could not connect to MongoDB:', res.message);
    process.exit(1);
  }

  try {
    console.log('[Seed] Clearing existing collections...');
    console.log('[Seed] Building indexes...');
    console.log('[Seed] Inserting demo data...');
    const counts = await seedAll();

    console.log('[Seed] Ensuring a coordinator account exists...');
    const { created } = await ensureDemoCoordinator();
    console.log(created ? '[Seed] Demo coordinator created.' : '[Seed] Demo coordinator already present.');

    console.log('\n✅ Successfully seeded MongoDB!');
    console.log(
      `   ${counts.events} events, ${counts.skills} skills, ${counts.volunteers} volunteers, ` +
        `${counts.teams} teams, ${counts.assignments} assignments, ${counts.tasks} tasks`
    );
    for (const e of summarise()) {
      console.log(
        `   • ${e.name}  (${e.teams} teams, ${e.volunteers} volunteers, ${e.tasks} tasks)${e.isActive ? '  [active]' : ''}`
      );
    }
    console.log('   Sign in with: coordinator@campus.edu / password123');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('[Seed] Error during seeding:', error);
    process.exit(1);
  }
}

runSeed();
