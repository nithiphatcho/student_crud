// backend-express/index.js
const express = require('express');
const cors = require('cors');
const studentsRouter = require('./routes/students');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/students', studentsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Express API ready at http://localhost:${PORT}`);
});