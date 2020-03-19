const express = require('express');
const app = express();

// Middleware
const log = require('./routes/middleware/log');
const auth = require('./routes/middleware/auth');

const loginRouter = require('./routes/api/login');
const userRouter = require('./routes/api/me');

app.use(express.json());
app.use(log);
app.use('/api', loginRouter);

app.use(auth);
app.use('/api', userRouter);

app.listen(8082);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJEYW4iLCJwYXNzd29yZCI6InF3ZXIiLCJpYXQiOjE1ODQ2MTI3MjN9.DElRHFBM4cqwbo8s0m9H8skyK7cgjcd0zgY2aSV-KKQ
