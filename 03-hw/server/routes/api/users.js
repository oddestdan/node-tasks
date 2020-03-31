const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { saltFactor } = require('config').get('password');

const { User, Load } = require('../../models');

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

// // Update whole User
// router.put('/users/:id', (req, res) => {
//   if (req.user.userId === req.params.id) {
//     User.findByIdAndUpdate(req.params.id, {
//       username: req.body.username,
//       password: req.body.password,
//       role: req.body.role,
//       description: req.body.description
//     })
//       .then(user => res.json({ status: 'ok', user }))
//       .catch(e => {
//         res.status(500).json({ status: e.message });
//       });
//   } else {
//     res
//       .status(401)
//       .json({ status: `User can't change another user's info` });
//   }
// });

// Update User password
router.patch('/users/:id', async (req, res) => {
  if (req.user.userId === req.params.id) {
    try {
      let { password } = req.body;

      const validation = User.joiValidate({ password });
      if (validation.error) {
        return res.status(422).json({ status: validation.error.message });
      }

      const salt = await bcrypt.genSalt(saltFactor);
      password = await bcrypt.hash(password, salt);

      const user = await User.findByIdAndUpdate(req.params.id, { password });
      res.json({ status: 'ok', user });
    } catch (error) {
      res.status(500).json({ status: error.message });
    }
  } else {
    res
      .status(401)
      .json({ status: `User can't change another user's password` });
  }
});

// Delete User
router.delete('/users/:id', (req, res) => {
  if (req.user.userId === req.params.id) {
    User.findByIdAndDelete(req.params.id)
      .then(user => res.json({ status: 'ok' }))
      .catch(e => {
        res.status(500).json({ status: e.message });
      });
  } else {
    res.status(401).json({ status: `User can't delete another user` });
  }
});

// [Driver] View assigned load
router.get('/users/:id/load', async (req, res) => {
  try {
    const { _id, role, username } = await User.findById(req.params.id);

    if (role === 'driver') {
      const assignedLoad = await Load.find({ assigneeId: _id });
      if (assignedLoad) {
        res.json({ status: 'ok', assignedLoad });
      } else {
        res
          .status(404)
          .json({ status: `User ${username} doesn't have any assigned loads` });
      }
    } else {
      res.status(400).json({ status: 'Shippers do not have assigned loads' });
    }
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

// [Shipper] View shipping info
router.get('/users/:id/shipping', async (req, res) => {
  try {
    const { _id, role, username } = await User.findById(req.params.id);

    if (role === 'shipper') {
      const loadShippingInfo = await Load.find({ creatorId: _id });
      if (loadShippingInfo) {
        res.json({ status: 'ok', loadShippingInfo });
      } else {
        res
          .status(404)
          .json({ status: `User ${username} doesn't have any shipping loads` });
      }
    } else {
      res.status(400).json({ status: `Drivers can't see shipping info` });
    }
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

module.exports = router;
