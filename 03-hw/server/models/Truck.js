const mongoose = require('mongoose');

const { TruckValidation } = require('../validation');
const { statuses, truckTypes } = require('../globals');

const TruckSchema = new mongoose.Schema(
  {
    creatorId: { type: String, required: true },
    assigneeId: { type: String, default: '' },
    status: { type: String, default: statuses.truck['inService'] },
    type: { type: String, default: truckTypes['sprinter'] }
  },
  {
    timestamps: true
  }
);

TruckSchema.statics.joiValidate = data => TruckValidation.validate(data);

const Truck = mongoose.model('Truck', TruckSchema);

module.exports = Truck;
