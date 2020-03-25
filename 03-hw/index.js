const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Config variables
const config = require('config');
const { port } = config.get('server');
const { username, password, cluster, dbname } = config.get('db');
const dbURI = `mongodb+srv://${username}:${password}@${cluster}/${dbname}?retryWrites=true&w=majority`;

// MongoDB
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Schema Models
require('./models/User');

// Backend middleware
app.use(express.json());
app.use(require('./middleware/log'));
// app.use(express.urlencoded({ extended: false }));

app.use('/api', require('./routes/api/register'));
app.use('/api', require('./routes/api/login'));
app.use('/api', require('./routes/api/users'));
// app.use('/api', require('./routes/api/loads'));
app.use('/api', require('./routes/api/index'));

// const PORT = process.env.PORT || port;
app.listen(port, () => console.log(`Server started on port ${port}`));
