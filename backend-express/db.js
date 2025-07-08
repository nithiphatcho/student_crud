// // backend-express/db.js
// const sqlite3 = require('sqlite3').verbose();
// const path = require('path');

// // ชี้ไปที่ database.db ใน ../instance/
// const dbPath = path.join(__dirname, '..', 'instance', 'database.db');
// const db = new sqlite3.Database(dbPath);

// module.exports = db;

// backend-express/db.js
require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = db.promise(); // ใช้ async/await ได้