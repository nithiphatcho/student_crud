// backend-express/routes/students.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// ดึงข้อมูลนักเรียนทั้งหมด
router.get('/', (req, res) => {
  db.all('SELECT * FROM student', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// เพิ่มนักเรียน
router.post('/', (req, res) => {
  const { student_id, name, score } = req.body;
  db.run('INSERT INTO student (student_id, name, score) VALUES (?, ?, ?)',
    [student_id, name, score],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    });
});

// แก้ไขข้อมูล
router.put('/:id', (req, res) => {
  const { student_id, name, score } = req.body;
  db.run('UPDATE student SET student_id = ?, name = ?, score = ? WHERE id = ?',
    [student_id, name, score, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ updated: this.changes });
    });
});

// ลบ
router.delete('/:id', (req, res) => {
  db.run('DELETE FROM student WHERE id = ?', req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ deleted: this.changes });
  });
});

module.exports = router;