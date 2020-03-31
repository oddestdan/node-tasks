const mongoose = require('mongoose');

const { TruckValidation } = require('../validation');
const { statuses, truckTypes } = require('../globals');

const TruckSchema = new mongoose.Schema(
  {
    creatorId: { type: String, required: true },
    assigneeId: { type: String, default: '' },
    status: { type: String, default: statuses.truck['inService'] },
    // status: ['IS' | 'OL']
    type: { type: String, default: truckTypes['sprinter'] }
    // type: is one of the hardcoded ones
    // // 300x250x170, 1700 - SPRINTER
    // // 500x250x170, 2500 - SMALL_STRAIGHT
    // // 700x350x200, 4000 - LARGE_STRAIGHT
  },
  {
    timestamps: true
  }
);

TruckSchema.statics.joiValidate = data => TruckValidation.validate(data);

const Truck = mongoose.model('Truck', TruckSchema);

module.exports = Truck;
