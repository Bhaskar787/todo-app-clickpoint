const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/tasks', taskRoutes);

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});