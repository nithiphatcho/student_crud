// backend-express/db.js
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// ชี้ไปที่ database.db ใน ../instance/
const dbPath = path.join(__dirname, '..', 'instance', 'database.db');
const db = new sqlite3.Database(dbPath);

module.exports = db;