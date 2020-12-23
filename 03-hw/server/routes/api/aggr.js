const express = require('express');
const router = express.Router();

const { User, Load, Truck } = require('../../models');
const { statuses, loadStates } = require('../../globals');

const {
  getNextLoadState,
  findTruckCandidate,
  handleLoadsStatusFiltering,
  handleLoadsPagination,
  convertLogsToString,
} = require('./helpers');
const { parseUrlParams } = require('../../utils');

// Use Aggregation Pipeline to get
// New loads with same creator and sort them by payload value
router.get('/aggr', async (req, res) => {
  try {
    Load.aggregate(
      [
        {
          $project: {
            creatorId: 1,
            assigneeId: 1,
            logs: 1,
            status: 1,
            dimensions: 1,
            payload: 1,
          },
        },
        { $match: { logs: { $exists: true, $not: { $size: 0 } } } },
        {
          $lookup: {
            from: 'user',
            localField: 'assigneeId',
            foreignField: '_id',
            as: 'assignees',
          },
        },
        {
          $group: {
            _id: '$status',
            total: { $sum: '$payload' },
          },
        },
        { $sort: { total: -1 } },
      ],
      (err, result) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(result);
        res.json({ status: `Showing result`, result });
      }
    );
  } catch (error) {
    res.status(500).json({ status: error.message });
  }
});

module.exports = router;
