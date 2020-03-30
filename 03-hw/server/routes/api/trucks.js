const express = require('express');
const router = express.Router();

const { User, Truck } = require('../../models');

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
  // const { _id } = await getUserById(req.user);
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

  if (role === 'driver') {
    const validation = Truck.joiValidate({ type });
    if (validation.error) {
      return res.status(422).json({ status: validation.error.message });
    }

    const truck = new Truck({ type, creatorId: _id });

    truck
      .save()
      .then(() => {
        res.json({ status: 'New truck created', truck });
      })
      .catch(e => {
        res.status(500).json({ status: e.message });
      });
  } else {
    res.status(400).json({
      status: 'Shipper is unable to create trucks'
    });
  }
});

// Assign Truck to Self
router.patch('/trucks/assign/:id', async (req, res) => {
  const { _id } = await User.findOne({ _id: req.user.userId });

  Truck.findByIdAndUpdate(req.params.id, { assigneeId: _id })
    .then(truck => {
      res.json({ status: 'ok', truck });
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Update Truck Info
router.put('/trucks/:id', async (req, res) => {
  const { role } = await User.findOne({ _id: req.user.userId });
  if (role === 'driver') {
    const validation = Truck.joiValidate(req.body);
    if (validation.error) {
      return res.status(422).json({ status: validation.error.message });
    }

    Truck.findByIdAndUpdate(req.params.id, req.body)
      .then(truck => res.json({ status: 'ok', truck }))
      .catch(e => {
        res.status(500).json({ status: e.message });
      });
  } else {
    res.status(400).json({
      status: 'Shipper is unable to update trucks info'
    });
  }
});

// Delete Truck
router.delete('/trucks/:id', async (req, res) => {
  const { role } = await User.findOne({ _id: req.user.userId });
  if (role === 'driver') {
    Truck.findByIdAndDelete(req.params.id)
      .then(truck => res.json({ status: 'ok' }))
      .catch(e => {
        res.status(500).json({ status: e.message });
      });
  } else {
    res.status(400).json({
      status: 'Shipper is unable to delete trucks'
    });
  }
});

module.exports = router;
