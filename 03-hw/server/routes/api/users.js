const express = require('express');
const router = express.Router();

const User = require('../../models/User');

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
// Handled by 'register'

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
