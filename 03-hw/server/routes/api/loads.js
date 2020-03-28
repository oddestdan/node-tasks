const express = require('express');
const router = express.Router();

const Load = require('../../models/Load');
const User = require('../../models/User');

const getUserByUserPass = user => {
  const { username, password } = user;
  return User.findOne({ username, password });
};

// Get Created Loads or Get Assigned Loads
router.get('/loads', async (req, res) => {
  const { username, _id } = await getUserByUserPass(req.user);

  Load.find({
    $or: [{ creatorId: _id }, { assigneeId: _id }]
  })
    .then(loads => {
      if (loads.length) {
        res.json({ status: 'ok', loads });
      } else {
        res
          .status(400)
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
    .then(load => res.json({ status: 'ok', load }))
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
  const { role, _id } = await getUserByUserPass(req.user);

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

// Update Load if NEW
router.put('/loads/:id', (req, res) => {
  Load.findByIdAndUpdate(req.params.id, req.body)
    .then(load => {
      if (load.status === 'NEW') {
        res.json({ status: 'ok', load });
      } else {
        res.status(400).json({ status: 'Load is no longer NEW' });
      }
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Update Load status
router.patch('/loads/status/:id', (req, res) => {
  Load.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  })
    .then(load => res.json({ status: 'ok', load }))
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// TODO: Update Load assignee to appropriate Driver
// (Automatic by the system when Shipper posts a Load)
router.patch('/loads/assign/:id', (req, res) => {
  // Find Load by Id
  // Find User that matches with current load dimensions
  // Update the Load.assigneeId with User._id

  Load.findById(req.params.id)
    .then(load => {
      const dimensionsLoad = load.dimensions;
      const matchDims = (dim1, dim2) => {
        // some logic for matching dimensions
        // width, length and height
        return true;
      };

      res.json({ status: 'ok', load });
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

// Delete Load if NEW
router.delete('/loads/:id', (req, res) => {
  Load.findByIdAndDelete(req.params.id)
    .then(load => {
      if (load.status === 'NEW') {
        res.json({ status: 'ok' });
      } else {
        res.status(400).json({ status: 'Load is no longer NEW' });
      }
    })
    .catch(e => {
      res.status(500).json({ status: e.message });
    });
});

module.exports = router;
