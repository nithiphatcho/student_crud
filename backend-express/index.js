// backend-express/index.js
const express = require('express');
const cors = require('cors');
const studentsRouter = require('./routes/students');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/students', studentsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Express running on port ${PORT}`);
});