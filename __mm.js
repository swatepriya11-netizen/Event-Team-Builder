const { MongoMemoryServer } = require("mongodb-memory-server");
(async () => {
  try {
    const s = await MongoMemoryServer.create();
    console.log("URI:", s.getUri());
    await s.stop();
  } catch (e) { console.log("FAILED:", String(e.message).slice(0, 300)); }
  process.exit(0);
})();
