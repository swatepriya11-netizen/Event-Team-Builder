#!/usr/bin/env node
/**
 * Start / stop the local MongoDB used in development.
 *
 * Why this exists: there is no system MongoDB on this machine and no mongosh, so
 * the app runs against a mongod binary that npm downloaded into the project
 * cache. Without a script the exact binary path and --dbpath have to be
 * remembered by hand, and the data directory used to live in %TEMP%, where a
 * routine Windows cleanup would silently delete the whole database.
 *
 *   node scripts/mongod.js start
 *   node scripts/mongod.js stop
 *   node scripts/mongod.js status
 *
 * Override the defaults with MONGOD_DBPATH / MONGOD_BIN / MONGOD_PORT.
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn, spawnSync, execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DBPATH =
  process.env.MONGOD_DBPATH ||
  (os.platform() === 'win32'
    ? 'C:\\Users\\misha\\mongodb-data'
    : path.join(os.homedir(), '.event-team-builder', 'mongodb-data'));
const PORT = process.env.MONGOD_PORT || '27017';
const HOST = process.env.MONGOD_HOST || '127.0.0.1';

/** Find the mongod that npm downloaded into the project cache. */
function findBinary() {
  if (process.env.MONGOD_BIN) return process.env.MONGOD_BIN;

  const cacheDir = path.join(ROOT, 'node_modules', '.cache', 'mongodb-memory-server');
  if (fs.existsSync(cacheDir)) {
    const found = fs
      .readdirSync(cacheDir)
      .filter((f) => /^mongod.*\.exe$/i.test(f) || /^mongod$/i.test(f))
      .sort()
      .pop();
    if (found) return path.join(cacheDir, found);
  }
  // Fall back to a system install.
  return os.platform() === 'win32' ? 'mongod.exe' : 'mongod';
}

function isListening() {
  const net = require('net');
  return new Promise((resolve) => {
    const socket = net.connect({ host: HOST, port: Number(PORT) });
    const done = (v) => {
      socket.destroy();
      resolve(v);
    };
    socket.setTimeout(1500);
    socket.once('connect', () => done(true));
    socket.once('timeout', () => done(false));
    socket.once('error', () => done(false));
  });
}

async function start() {
  if (await isListening()) {
    console.log(`mongod is already listening on ${HOST}:${PORT}`);
    return;
  }

  const bin = findBinary();
  if (!fs.existsSync(bin) && !/^mongod(\.exe)?$/i.test(bin)) {
    console.error(`Could not find mongod.\n  looked for: ${bin}\n  set MONGOD_BIN to override.`);
    process.exit(1);
  }

  fs.mkdirSync(DBPATH, { recursive: true });
  const logFile = path.join(path.dirname(DBPATH), 'mongod.log');
  const out = fs.openSync(logFile, 'a');

  const child = spawn(bin, ['--dbpath', DBPATH, '--bind_ip', HOST, '--port', PORT], {
    detached: true,
    stdio: ['ignore', out, out],
  });
  child.unref();

  // Poll rather than trusting the spawn, so we report the real outcome.
  for (let i = 0; i < 20; i += 1) {
    await new Promise((r) => setTimeout(r, 500));
    if (await isListening()) {
      console.log(`mongod started (pid ${child.pid})`);
      console.log(`  dbpath: ${DBPATH}`);
      console.log(`  uri:    mongodb://${HOST}:${PORT}/event-team-builder`);
      console.log(`  log:    ${logFile}`);
      return;
    }
  }
  console.error(`mongod did not start. Check ${logFile}`);
  process.exit(1);
}

async function stop() {
  if (process.platform === 'win32') {
    // No pkill; find the pid that owns the listening port.
    let out = '';
    try {
      out = execFileSync('netstat', ['-ano', '-p', 'TCP'], { encoding: 'utf8' });
    } catch {
      /* ignore */
    }
    const pids = new Set();
    for (const line of out.split('\n')) {
      if (line.includes(`:${PORT}`) && line.includes('LISTENING')) {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (/^\d+$/.test(pid)) pids.add(pid);
      }
    }
    if (!pids.size) {
      console.log(`nothing listening on ${HOST}:${PORT}`);
      return;
    }
    for (const pid of pids) {
      spawnSync('taskkill', ['/PID', pid, '/F'], { stdio: 'ignore' });
      console.log(`stopped mongod (pid ${pid})`);
    }
    return;
  }

  spawnSync('pkill', ['-f', `mongod.*--port ${PORT}`]);
  console.log(`sent SIGTERM to mongod on port ${PORT}`);
}

async function status() {
  const listening = await isListening();
  console.log(`mongod on ${HOST}:${PORT}: ${listening ? 'running' : 'not listening'}`);
  console.log(`  dbpath: ${DBPATH}${fs.existsSync(DBPATH) ? '' : '  (does not exist)'}`);
  console.log(`  binary: ${findBinary()}`);
  if (!listening) process.exitCode = 1;
}

const command = process.argv[2] || 'status';
const commands = { start, stop, status };

if (!commands[command]) {
  console.error(`Unknown command "${command}". Use: start | stop | status`);
  process.exit(1);
}

commands[command]().catch((err) => {
  console.error(err.message);
  process.exit(1);
});