// test.js
const db = require('./db');

(async () => {
  try {
    const result = await db.query('SELECT NOW()');
    console.log('✅ Connection Success:', result.rows[0]);
    process.exit(0);
  } catch (err) {
    console.error('❌ Connection Error:', err.message);
    process.exit(1);
  }
})();