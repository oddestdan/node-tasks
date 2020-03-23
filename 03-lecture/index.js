const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/node_part_3_lecture', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = mongoose.model(
  'User',
  mongoose.Schema({
    username: String,
    password: String
  })
);

// Get All Users
app.get('/api/users', (req, res) => {
  User.find({})
    .then(users => res.json({ status: 'ok', users }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Get User
app.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json({ status: 'ok', user }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Create User
app.post('/api/users', (req, res) => {
  console.log('GET /api/users', req.body);
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user
    .save()
    .then(() => {
      res.json({ status: 'new user created' });
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Update User
app.put('/api/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    username: req.body.username,
    password: req.body.password
  })
    .then(user => res.json({ status: 'ok', user }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Delete User
app.delete('/api/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => res.json({ status: 'ok' }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

const PORT = 8081;
app.listen(PORT, () => console.log(`Server has been start on port ${PORT}`));
