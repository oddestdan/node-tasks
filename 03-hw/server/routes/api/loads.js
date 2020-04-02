const express = require('express');
const router = express.Router();

const { User, Load, Truck } = require('../../models');
const { statuses, loadStates } = require('../../globals');

const { findTruckCandidate } = require('./helpers');

// Get Created Loads or Get Assigned Loads
router.get('/loads', async (req, res) => {
  const { username, _id } = await User.findOne({ _id: req.user.userId });

  Load.find({
    $or: [{ creatorId: _id }, { assigneeId: _id }]
  })
    .then(loads => {
      if (loads.length) {
        res.json({ status: 'Showing all loads', loads });
      } else {
        res
          .status(404)
          .json({ status: `No loads found for user: ${username}` });
      }
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Get Load
router.get('/loads/:id', (req, res) => {
  Load.findById(req.params.id)
    .then(load => res.json({ status: `Showing load ${load._id}`, load }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Create Load
router.post('/loads', async (req, res) => {
  // creatorId: Assigned by current User-Shipper
  // assigneeId: default ''
  // logs: default []
  // status: default 'NEW'
  // state: default ''
  // dimensions: Specified at UI (Object)
  // payload: Specified at UI (Number)

  const { dimensions, payload } = req.body;
  const { role, _id } = await User.findOne({ _id: req.user.userId });

  const validation = Load.joiValidate({ dimensions, payload });
  if (validation.error) {
    return res.status(422).json({ status: validation.error.message });
  }

  if (role === 'shipper') {
    const load = new Load({ dimensions, payload, creatorId: _id });

    load
      .save()
      .then(() => {
        res.json({ status: 'New load created', load });
      })
      .catch(e => {
        res.status(500).json({ status: e.message });
      });
  } else {
    res.status(400).json({ status: 'Driver is unable to create loads' });
  }
});

// Post a Load & Automatically assign to appropriate Truck
router.patch('/loads/:id/post', async (req, res) => {
  try {
    // Find Load by Id and update status to POSTED
    const load = await Load.findByIdAndUpdate(req.params.id, {
      status: statuses.load['posted']
    });

    if (!load) {
      res.status(404).json({ status: `Load ${load._id} not found` });
    }

    const trucks = await Truck.find({});
    const truckCandidate = findTruckCandidate(trucks, load);

    if (!truckCandidate) {
      // update status back to NEW
      load.status = statuses.load['new'];
      load.save();
      // await Load.findByIdAndUpdate(req.params.id, {
      //   status: statuses.load['new']
      // });
      return res.status(404).json({ status: 'Unable to find fitting truck' });
    }

    truckCandidate.status = statuses.truck['onLoad'];
    await truckCandidate.save();

    load.assigneeId = truckCandidate.assigneeId;
    load.status = statuses.load['assigned'];
    load.state = loadStates['erPickUp'];
    load.logs = [
      ...load.logs,
      {
        message: `Found fitting truck. State update: ${load.state}`,
        time: new Date().toISOString()
      }
    ];
    await load.save();

    return res.json({
      status: 'Found an appropriate truck candidate for the load',
      load,
      truckCandidate
    });
  } catch (error) {
    return res.status(500).json({ status: error.message });
  }
});

// Update Load if NEW
router.put('/loads/:id', async (req, res) => {
  try {
    const validation = Load.joiValidate(req.body);
    if (validation.error) {
      return res.status(422).json({ status: validation.error.message });
    }

    const load = await Load.findById(req.params.id);
    if (load.status === 'NEW') {
      Object.assign(load, req.body);
      load.logs = [
        ...load.logs,
        { message: `Updated load`, time: new Date().toISOString() }
      ];
      await load.save();

      res.json({ status: `Updated load ${load._id}`, load });
    } else {
      res.status(400).json({ status: 'Load is no longer NEW' });
    }
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

// Update Load status (for driver)
router.patch('/loads/:id/state', async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  if (user.role === 'shipper') {
    return res
      .status(400)
      .json({ status: 'Shipper is unable to update load status' });
  }

  try {
    const { state } = req.body;

    const validation = Load.joiValidate({ state });
    if (validation.error) {
      return res.status(422).json({ status: validation.error.message });
    }

    // Update Load info
    const load = await Load.findById(req.params.id);
    if (state === loadStates['arDelivery']) {
      // Load reached delivery destination
      load.status = statuses.load['shipped'];

      // Reset Truck availability
      const truck = await Truck.findOne({ assigneeId: user._id });
      truck.status = statuses.truck['inService'];
      await truck.save();
    }
    load.state = state;
    load.logs = [
      ...load.logs,
      { message: `State update: ${state}`, time: new Date().toISOString() }
    ];
    await load.save();

    res.json({
      status: `Load state updated: ${state}. Load status: ${load.status}`
    });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

// Delete Load if NEW
router.delete('/loads/:id', async (req, res) => {
  try {
    const load = await Load.findById(req.params.id);
    if (load.status === 'NEW') {
      await load.deleteOne();

      res.json({ status: 'Load deleted', load });
    } else {
      res.status(400).json({ status: 'Load is no longer NEW' });
    }
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

module.exports = router;
