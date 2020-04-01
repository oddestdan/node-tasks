const express = require('express');
const router = express.Router();

const { User, Truck } = require('../../models');

const { checkUserIsOnLoad } = require('./helpers');

// Get All Trucks
router.get('/trucks', (req, res) => {
  Truck.find()
    .then(trucks => {
      res.json({ status: 'ok', trucks });
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Get Created Trucks
router.get('/trucks/created', async (req, res) => {
  const { _id } = await User.findOne({ _id: req.user.userId });

  Truck.find({ creatorId: _id })
    .then(trucks => {
      if (trucks.length) {
        res.json({ status: 'ok', trucks });
      } else {
        res.status(400).json({ status: 'No trucks found' });
      }
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Get Truck
router.get('/trucks/:id', (req, res) => {
  Truck.findById(req.params.id)
    .then(truck => res.json({ status: 'ok', truck }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Create Truck
router.post('/trucks', async (req, res) => {
  // creatorId: Assigned by creator User-Driver
  // assigneeId: default ''
  // status: default ''
  // type: Specified at UI, one of the hardcoded ones
  // // 300x250x170, 1700 - SPRINTER
  // // 500x250x170, 2500 - SMALL_STRAIGHT
  // // 700x350x200, 4000 - LARGE_STRAIGHT
  const { type } = req.body;
  const { role, _id } = await User.findOne({ _id: req.user.userId });

  if (role === 'shipper') {
    return res.status(400).json({
      status: 'Shipper is unable to create trucks'
    });
  }

  if (await checkUserIsOnLoad(_id)) {
    return res.status(400).json({
      status: 'Driver is unable to create trucks while on load'
    });
  }

  const validation = Truck.joiValidate({ type });
  if (validation.error) {
    return res.status(422).json({ status: validation.error.message });
  }

  const truck = new Truck({ type, creatorId: _id });

  truck
    .save()
    .then(() => {
      return res.json({ status: 'New truck created', truck });
    })
    .catch(e => {
      return res.status(500).json({ status: e.message });
    });
});

// Assign Truck to Self
router.patch('/trucks/:id/assign', async (req, res) => {
  const { _id } = await User.findOne({ _id: req.user.userId });
  const truckId = req.params.id;

  if (await checkUserIsOnLoad(_id)) {
    return res.status(400).json({
      status: 'Driver is unable to self-assign trucks while on load'
    });
  }

  const userAssignedTruck = await Truck.findOne({ assigneeId: _id });
  if (userAssignedTruck) {
    // Reset previously assigned truck
    userAssignedTruck.assigneeId = '';
    await userAssignedTruck.save();
  }

  try {
    const truck = await Truck.findByIdAndUpdate(truckId, { assigneeId: _id });
    if (!truck) {
      return res.status(404).json({ status: `Truck ${truckId} not found` });
    }

    return res.json({ status: 'ok', truck });
  } catch (error) {
    return res.status(500).json({ status: error.message });
  }
});

// Update Truck Info
router.put('/trucks/:id', async (req, res) => {
  const { _id, role } = await User.findOne({ _id: req.user.userId });

  if (role === 'shipper') {
    return res.status(400).json({
      status: 'Shipper is unable to update trucks info'
    });
  }

  if (await checkUserIsOnLoad(_id)) {
    return res.status(400).json({
      status: 'Driver is unable to update trucks info while on load'
    });
  }

  const validation = Truck.joiValidate(req.body);
  if (validation.error) {
    return res.status(422).json({ status: validation.error.message });
  }

  Truck.findByIdAndUpdate(req.params.id, req.body)
    .then(truck => res.json({ status: 'ok', truck }))
    .catch(e => {
      return res.status(500).json({ status: e.message });
    });
});

// Delete Truck
router.delete('/trucks/:id', async (req, res) => {
  const { _id, role } = await User.findOne({ _id: req.user.userId });
  if (role === 'shipper') {
    return res.status(400).json({
      status: 'Shipper is unable to delete trucks'
    });
  }

  if (await checkUserIsOnLoad(_id)) {
    return res.status(400).json({
      status: 'Driver is unable to delete trucks while on load'
    });
  }

  Truck.findByIdAndDelete(req.params.id)
    .then(truck => res.json({ status: 'ok' }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

module.exports = router;
