/**
 * Write a MongoDB URI into .env with correct percent-encoding.
 *
 *   node scripts/set-mongo-uri.js mongodb+srv://user:pass@host/db   # full URI
 *   echo "mypass" | node scripts/set-mongo-uri.js --atlas user host db
 *
 * Why this exists: a password containing @ : / ? # [ ] or % must be
 * percent-encoded or the driver silently mis-parses the URI and fails with a
 * confusing "Authentication failed". encodeURIComponent does it correctly.
 *
 * The password is accepted on stdin or as an argument, never echoed, and the
 * URI is printed with the password masked.
 */
const fs = require('fs');
const path = require('path');

const ENV_PATH = path.join(__dirname, '..', '.env');

function redact(uri) {
  return String(uri).replace(/^(mongodb(?:\+srv)?:\/\/)([^:@/]+):([^@/]+)@/, '$1$2:****@');
}

function usage(code) {
  console.log(`
Usage:
  node scripts/set-mongo-uri.js "<full mongodb uri>"
  node scripts/set-mongo-uri.js --local [port] [dbname]
  node scripts/set-mongo-uri.js --atlas <username> <cluster-host> [dbname]   (password on stdin)

Examples:
  node scripts/set-mongo-uri.js --local
  echo 'p@ss:word' | node scripts/set-mongo-uri.js --atlas innaamulhaq12_db_user cluster0.nbyegj6.mongodb.net
`);
  process.exit(code);
}

/** Read a single line from stdin. Returns '' when stdin is a TTY / unavailable. */
function readStdin() {
  try {
    return fs.readFileSync(0, 'utf8').split(/\r?\n/)[0].trim();
  } catch (_) {
    return '';
  }
}

const argv = process.argv.slice(2);
if (!argv.length || argv.includes('-h') || argv.includes('--help')) usage(0);

let uri;

if (argv[0] === '--local') {
  const port = argv[1] || '27017';
  const db = argv[2] || 'event-team-builder';
  uri = `mongodb://localhost:${port}/${db}`;
} else if (argv[0] === '--atlas') {
  const user = argv[1];
  const host = argv[2];
  const db = argv[3] || 'event-team-builder';
  if (!user || !host) usage(1);

  const password = readStdin();
  if (!password) {
    console.error('No password received on stdin.');
    console.error("Pipe it in, e.g.  echo 'yourpassword' | node scripts/set-mongo-uri.js --atlas ...");
    process.exit(1);
  }

  // encodeURIComponent escapes everything MongoDB requires in a credential.
  // It leaves !'()* alone, which is valid in a URI, so this is safe as-is.
  uri = `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}/${db}`
      + `?retryWrites=true&w=majority`;
} else {
  uri = argv[0];
}

// Sanity-check before writing: a URI we cannot parse here would fail later in
// the driver with a much less obvious message.
try {
  // eslint-disable-next-line global-require
  const { MongoClient } = require('mongodb');
  const parsed = new MongoClient(uri);
  void parsed.options;
  parsed.close().catch(() => {});
} catch (err) {
  console.error(`Refusing to write an unparseable URI: ${err.message}`);
  process.exit(1);
}

let contents;
try {
  contents = fs.readFileSync(ENV_PATH, 'utf8');
} catch (_) {
  console.error(`Cannot read ${ENV_PATH}`);
  process.exit(1);
}

const line = `MONGODB_URI=${uri}`;
if (/^MONGODB_URI=.*$/m.test(contents)) {
  contents = contents.replace(/^MONGODB_URI=.*$/m, line);
} else {
  contents = contents.replace(/\n*$/, '\n\n' + line + '\n');
}

fs.writeFileSync(ENV_PATH, contents);

console.log(`Wrote to .env:\n  ${line.replace(/:([^:@/]+)@/, ':****@')}`);
console.log(`\nNext: npm run db:verify`);
