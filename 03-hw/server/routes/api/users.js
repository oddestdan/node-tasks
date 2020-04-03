const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const { saltFactor } = require('config').get('password');

const { User, Load } = require('../../models');

const { checkUserIsOnLoad } = require('./helpers');

// Get All Users
router.get('/users', (req, res) => {
  User.find({})
    .then(users => res.json({ status: 'Showing all users', users }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Get User
router.get('/users/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json({ status: `Showing user ${user.username}`, user }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Create User
// Handled by 'register'

// Update User Account info
router.put('/users/:id', async (req, res) => {
  if (req.user.userId !== req.params.id) {
    return res
      .status(401)
      .json({ status: `User can't change another user's info` });
  }

  const { role, _id } = await User.findOne({ _id: req.user.userId });
  if (role === 'driver') {
    if (await checkUserIsOnLoad(_id)) {
      return res.status(400).json({
        status: 'Driver is unable to update account info while on load'
      });
    }
  }

  try {
    const validation = User.joiValidate(req.body);
    if (validation.error) {
      return res.status(422).json({ status: validation.error.message });
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    return res.json({ status: `Updated user ${user.username}`, user });
  } catch (error) {
    return res.status(500).json({ status: error.message });
  }
});

// Update User password
router.patch('/users/:id', async (req, res) => {
  if (req.user.userId !== req.params.id) {
    return res
      .status(401)
      .json({ status: `User can't change another user's password` });
  }

  try {
    let { password } = req.body;

    console.log('PASSWORD', password);
    const validation = User.joiValidate({ password });
    if (validation.error) {
      return res.status(422).json({ status: validation.error.message });
    }

    const salt = await bcrypt.genSalt(saltFactor);
    password = await bcrypt.hash(password, salt);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { password },
      { new: true }
    );
    return res.json({ status: `User ${user.username} password updated`, user });
  } catch (error) {
    return res.status(500).json({ status: error.message });
  }
});

// const user = await User.findOne({ _id: req.user.userId });
// if (user.role === 'shipper') {
//   if (await checkUserIsOnLoad(_id)) {
// }

// Delete User
router.delete('/users/:id', (req, res) => {
  if (req.user.userId !== req.params.id) {
    return res.status(401).json({ status: `User can't delete another user` });
  }

  User.findByIdAndDelete(req.params.id)
    .then(user => res.json({ status: `User ${user.username} deleted`, user }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// [Driver] View assigned load
router.get('/users/:id/load', async (req, res) => {
  try {
    const { _id, role, username } = await User.findById(req.params.id);

    if (role === 'shipper') {
      return res
        .status(400)
        .json({ status: 'Shippers do not have assigned loads' });
    }

    const assignedLoad = await Load.find({ assigneeId: _id });
    if (assignedLoad) {
      return res.json({
        status: `Viewing driver ${username} assigned load`,
        assignedLoad
      });
    } else {
      return res
        .status(404)
        .json({ status: `User ${username} doesn't have any assigned loads` });
    }
  } catch (error) {
    return res.status(500).json({ status: error.message });
  }
});

// [Shipper] View shipping info
router.get('/users/:id/shipping', async (req, res) => {
  try {
    const { _id, role, username } = await User.findById(req.params.id);

    if (role === 'driver') {
      res.status(400).json({ status: `Drivers can't see shipping info` });
    }
    const loadShippingInfo = await Load.find({ creatorId: _id });

    if (loadShippingInfo) {
      res.json({
        status: `Viewing shipper ${username} shippiing info`,
        loadShippingInfo
      });
    } else {
      res.status(404).json({
        status: `Shipper ${username} doesn't have any shipping loads`
      });
    }
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

module.exports = router;
