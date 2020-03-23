const express = require('express');
const app = express();
const cors = require('cors');

// Check against CORS whitelist
const whitelist = ['http://localhost:3000', undefined];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions));

// Backend middleware
const static = require('./routes/middleware/static');
const log = require('./routes/middleware/log');
const auth = require('./routes/middleware/auth');

// Handled routes
const loginRouter = require('./routes/api/login');
const notesRouter = require('./routes/api/notes');
const userRouter = require('./routes/api/user');
// Unhandled routes
const restRouter = require('./routes/api/rest');

app.use(express.json());
app.use(static);
app.use(log);

app.use('/api', loginRouter);
app.use(auth);
app.use('/api', userRouter);
app.use('/api', notesRouter);

app.use('', restRouter);

const port = process.env.PORT || 8081;
app.listen(port);

console.log(`App is listening on port ${port}...`);
