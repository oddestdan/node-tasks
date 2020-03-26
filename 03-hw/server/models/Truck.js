const mongoose = require('mongoose');

const TruckSchema = new mongoose.Schema({
  creatorId: { type: String, required: true },
  assigneeId: { type: String, default: '' },
  status: { type: String, default: 'NEW' },
  type: { type: String, default: '' },
  dimensions: { type: Object, default: {} }
});

const Truck = mongoose.model('Truck', TruckSchema);

module.exports = Truck;
