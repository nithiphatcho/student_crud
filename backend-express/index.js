// backend-express/index.js
const express = require('express');
const cors = require('cors');
const studentsRouter = require('./routes/students');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/students', studentsRouter);

app.listen(3000, () => {
  console.log('✅ Express API ready at http://localhost:3000');
});