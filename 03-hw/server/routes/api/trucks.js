const express = require('express');
const router = express.Router();

const { User, Truck } = require('../../models');

const { checkUserIsOnLoad } = require('./helpers');

// Get All Trucks
router.get('/trucks/all', (req, res) => {
  Truck.find()
    .then(trucks => {
      res.json({ status: 'Showing all trucks', trucks });
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Get Created Trucks
router.get('/trucks', async (req, res) => {
  const { username, _id } = await User.findOne({ _id: req.user.userId });

  Truck.find({ creatorId: _id })
    .then(trucks => {
      if (trucks.length) {
        res.json({ status: `Showing trucks created by ${username}`, trucks });
      } else {
        res.json({ status: `No trucks found for user: ${username}` });
      }
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Get Truck
router.get('/trucks/:id', (req, res) => {
  Truck.findById(req.params.id)
    .then(truck =>
      res.json({ status: `Showing truck by id ${req.params.id}`, truck })
    )
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Create Truck
router.post('/trucks', async (req, res) => {
  const { type } = req.body;
  const { role, _id } = await User.findOne({ _id: req.user.userId });

  if (role === 'shipper') {
    return res.status(403).json({
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
  const { username, _id } = await User.findOne({ _id: req.user.userId });
  const truckId = req.params.id;

  if (await checkUserIsOnLoad(_id)) {
    return res.status(403).json({
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
    const truck = await Truck.findByIdAndUpdate(
      truckId,
      { assigneeId: _id },
      { new: true }
    );
    if (!truck) {
      return res.status(404).json({ status: `Truck $${truckId} not found` });
    }

    const updatedTrucks = await Truck.find({});
    return res.json({
      status: `Truck ${truckId} self-assigned by ${username}`,
      trucks: updatedTrucks
    });
  } catch (error) {
    return res.status(500).json({ status: error.message });
  }
});

// Update Truck Info
router.put('/trucks/:id', async (req, res) => {
  const { _id, role } = await User.findOne({ _id: req.user.userId });

  if (role === 'shipper') {
    return res.status(403).json({
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

  Truck.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(truck => res.json({ status: `Updated truck ${truck._id}`, truck }))
    .catch(e => {
      return res.status(500).json({ status: e.message });
    });
});

// Delete Truck
router.delete('/trucks/:id', async (req, res) => {
  const { _id, role } = await User.findOne({ _id: req.user.userId });
  if (role === 'shipper') {
    return res.status(403).json({
      status: 'Shipper is unable to delete trucks'
    });
  }

  if (await checkUserIsOnLoad(_id)) {
    return res.status(400).json({
      status: 'Driver is unable to delete trucks while on load'
    });
  }

  Truck.findByIdAndDelete(req.params.id)
    .then(truck => res.json({ status: `Deleted truck ${truck._id}`, truck }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

module.exports = router;
