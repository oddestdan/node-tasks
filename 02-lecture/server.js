const express = require('express');
const app = express();
const log = require('./routes/middleware/log');
const booksRouter = require('./routes/api/books');

// Middleware
app.use(express.json());
app.use(log);

app.use('/api', booksRouter);

app.listen(8082);
