const express = require('express');
const mongoose = require('mongoose');
const app = express();

const { DB_URL } = require('./globals/configs');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Handled routes
const usersRouter = require('./routes/api/users');

// Backend middleware
const log = require('./middleware/log');

app.use(express.json());
app.use(log);

app.use('/api', usersRouter);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server has been started on port ${PORT}`));
