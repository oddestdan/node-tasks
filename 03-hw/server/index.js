const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const pino = require('pino');
const expressPino = require('express-pino-logger');

const app = express();

// Config variables
const config = require('config');
const { port } = config.get('server');
const { username, password, cluster, dbname } = config.get('db');
const dbURI = `mongodb+srv://${username}:${password}@${cluster}/${dbname}`;

// Logging
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
app.use(expressPino({ logger }));
app.use(require('./middleware/fileLog'));
process.on(
  'uncaughtException',
  pino.final(logger, (err, finalLogger) => {
    finalLogger.error(err, 'uncaughtException');
    process.exit(1);
  })
);

// MongoDB
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => logger.info('MongoDB connected'))
  .catch((err) => logger.error(err));

app.use(cors());
app.use(express.json());

app.use('/api', require('./routes/api/weather'));
app.use('/api', require('./routes/api/register'));
app.use('/api', require('./routes/api/login'));

app.use(require('./middleware/auth'));

app.use('/api', require('./routes/api/users'));
app.use('/api', require('./routes/api/loads'));
app.use('/api', require('./routes/api/trucks'));

app.listen(port, () => logger.info(`Server started on port ${port}`));
