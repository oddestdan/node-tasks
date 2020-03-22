const express = require('express');
const app = express();

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
app.use(auth);

app.use('/api', loginRouter);
app.use('/api', userRouter);
app.use('/api', notesRouter);

app.use('', restRouter);

const port = process.env.PORT || 8081;
app.listen(port);

console.log(`App is listening on port ${port}...`);
