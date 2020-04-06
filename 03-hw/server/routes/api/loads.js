const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');

const { User, Load, Truck } = require('../../models');
const { statuses, loadStates } = require('../../globals');

const {
  findTruckCandidate,
  handleLoadsStatusFiltering,
  handleLoadsPagination,
  convertLogsToString,
} = require('./helpers');
const { parseUrlParams } = require('../../utils');

// Get Created Loads or Get Assigned Loads
router.get('/loads', async (req, res) => {
  const params = parseUrlParams(req.url);

  try {
    const { username, _id } = await User.findOne({ _id: req.user.userId });

    let loads = await Load.find({
      $or: [{ creatorId: _id }, { assigneeId: _id }],
    });

    if (loads.length === 0) {
      return res
        .status(404)
        .json({ status: `No loads found for user: ${username}` });
    }

    const _metadata = { page: 1, rpp: 100, totalCount: loads.length };

    loads = handleLoadsStatusFiltering(loads, _metadata, params);
    loads = handleLoadsPagination(loads, _metadata, params);

    res.json({ status: `Showing loads of user ${username}`, _metadata, loads });
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

// Get Load
router.get('/loads/:id', (req, res) => {
  Load.findById(req.params.id)
    .then((load) => res.json({ status: `Showing load ${load._id}`, load }))
    .catch((e) => {
      res.status(500).json({ status: e.message });
    });
});

// Create Load
router.post('/loads', async (req, res) => {
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
      .catch((e) => {
        res.status(500).json({ status: e.message });
      });
  } else {
    res.status(400).json({ status: 'Driver is unable to create loads' });
  }
});

// Post a Load & Automatically assign to appropriate Truck
router.patch('/loads/:id/post', async (req, res) => {
  try {
    const load = await Load.findById(req.params.id);
    if (!load) {
      return res.status(404).json({ status: `Load ${load._id} not found` });
    }
    load.status = statuses.load['posted'];

    const trucks = await Truck.find({});
    const truckCandidate = findTruckCandidate(trucks, load);

    if (!truckCandidate) {
      load.status = statuses.load['new'];
      load.logs = [
        ...load.logs,
        {
          message: `Unable to find fitting truck`,
          time: new Date().toISOString(),
        },
      ];
      await load.save();
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
        time: new Date().toISOString(),
      },
    ];
    await load.save();

    return res.json({
      status: 'Found an appropriate truck candidate for the load',
      load,
      truckCandidate,
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
        { message: `Updated load`, time: new Date().toISOString() },
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

// Update Load state (for driver)
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
      { message: `State update: ${state}`, time: new Date().toISOString() },
    ];
    await load.save();

    res.json({
      status: `Load state updated: ${state}. Load status: ${load.status}`,
      load,
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

// Generate PDF report of Load's logs
router.post('/loads/:id/pdf', async (req, res) => {
  try {
    const load = await Load.findById(req.params.id);

    let filename = `logs-load_${req.params.id}`;
    let content =
      load.logs.length === 0 ? 'No logs added yet.' : load.logs.join('\n');

    content = convertLogsToString(load.logs);
    filename = encodeURIComponent(filename) + '.pdf';

    res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-type', 'application/pdf');

    const doc = new PDFDocument();
    doc.y = 300;
    doc.text(content, 50, 50);
    doc.pipe(res);
    doc.end();
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

module.exports = router;
