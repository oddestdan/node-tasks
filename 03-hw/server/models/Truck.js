const mongoose = require('mongoose');

const TruckSchema = new mongoose.Schema({
  creatorId: { type: String, required: true },
  assigneeId: { type: String, default: '' },
  status: { type: String, default: '' },
  // status: ['IS' | 'OL']
  // // IS => IN_SERVICE
  // // OL => ON_LOAD
  type: { type: String, default: 'SPRINTER' }
  // type: is one of the hardcoded ones
  // // 300x250x170, 1700 - SPRINTER
  // // 500x250x170, 2500 - SMALL_STRAIGHT
  // // 700x350x200, 4000 - LARGE_STRAIGHT
});

const Truck = mongoose.model('Truck', TruckSchema);

module.exports = Truck;
