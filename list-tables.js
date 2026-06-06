const db = require('better-sqlite3')('./lib/db/local.db');
try {
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log('--- FOUND TABLES ---');
    console.log(tables);
} catch (e) {
    console.error('Error:', e.message);
}
