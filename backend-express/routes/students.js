// // backend-express/routes/students.js
// const express = require('express');
// const router = express.Router();
// const db = require('../db');

// // ดึงข้อมูลนักเรียนทั้งหมด
// router.get('/', (req, res) => {
//   db.all('SELECT * FROM student', [], (err, rows) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json(rows);
//   });
// });

// // เพิ่มนักเรียน
// router.post('/', (req, res) => {
//   const { student_id, name, score } = req.body;
//   db.run('INSERT INTO student (student_id, name, score) VALUES (?, ?, ?)',
//     [student_id, name, score],
//     function (err) {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json({ id: this.lastID });
//     });
// });

// // แก้ไขข้อมูล
// router.put('/:id', (req, res) => {
//   const { student_id, name, score } = req.body;
//   db.run('UPDATE student SET student_id = ?, name = ?, score = ? WHERE id = ?',
//     [student_id, name, score, req.params.id],
//     function (err) {
//       if (err) return res.status(500).json({ error: err.message });
//       res.json({ updated: this.changes });
//     });
// });

// // ลบ
// router.delete('/:id', (req, res) => {
//   db.run('DELETE FROM student WHERE id = ?', req.params.id, function (err) {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json({ deleted: this.changes });
//   });
// });

// module.exports = router;

// backend-express/routes/students.js
const express = require('express');
const router = express.Router();
const db = require('../db'); // ใช้ Pool จาก pg

// GET all students
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM students ORDER BY id ASC;');
    res.json(result.rows); // ข้อมูลอยู่ใน result.rows
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new student
router.post('/', async (req, res) => {
  const { student_id, name, score } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO student (student_id, name, score) VALUES ($1, $2, $3) RETURNING id',
      [student_id, name, score]
    );
    res.json({ id: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update student
router.put('/:id', async (req, res) => {
  const { student_id, name, score } = req.body;
  try {
    const result = await db.query(
      'UPDATE student SET student_id = $1, name = $2, score = $3 WHERE id = $4',
      [student_id, name, score, req.params.id]
    );
    res.json({ updated: result.rowCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE student
router.delete('/:id', async (req, res) => {
  try {
    const result = await db.query('DELETE FROM student WHERE id = $1', [
      req.params.id,
    ]);
    res.json({ deleted: result.rowCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
