const mongoose = require('mongoose');

const { LoadValidation } = require('../validation');
const { statuses, loadStates } = require('../globals');

const LoadSchema = new mongoose.Schema(
  {
    creatorId: { type: String, required: true },
    assigneeId: { type: String, default: '' },
    logs: { type: Object, default: [] },
    status: { type: String, default: statuses.load['new'] },
    // status: ['NEW' | 'POSTED' | 'ASSIGNED' | 'SHIPPED']
    state: { type: String, default: loadStates['empty'] },
    // state: is one of the hardcoded ones
    // ['EN_ROUTE_TO_PICK_UP' | 'ARRIVED_TO_PICK_UP' |
    // // 'EN_ROUTE_TO_DELIVERY' | 'ARRIVED_TO_DELIVERY']
    dimensions: {
      type: Object,
      // required: true,
      default: {}
    },
    payload: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

LoadSchema.statics.joiValidate = data => LoadValidation.validate(data);

const Load = mongoose.model('Load', LoadSchema);

module.exports = Load;
