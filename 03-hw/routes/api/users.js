const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = mongoose.model(
  'User',
  mongoose.Schema({
    username: String,
    password: String, // TODO: implement security hashing
    role: String,
    description: String
  })
);

// Get All Users
router.get('/users', (req, res) => {
  User.find({})
    .then(users => res.json({ status: 'ok', users }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Get User
router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json({ status: 'ok', user }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Create User
router.post('/users', (req, res) => {
  console.log('GET /users', req.body);
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    description: req.body.description
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

// Update whole User
router.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
    description: req.body.description
  })
    .then(user => res.json({ status: 'ok', user }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Update User password
router.patch('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, {
    password: req.body.password
  })
    .then(user => res.json({ status: 'ok', user }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Delete User
router.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => res.json({ status: 'ok' }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

module.exports = router;
