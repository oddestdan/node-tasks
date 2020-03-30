const mongoose = require('mongoose');

const LoadSchema = new mongoose.Schema(
  {
    creatorId: { type: String, required: true },
    assigneeId: { type: String, default: '' },
    logs: { type: Object, default: [] },
    status: { type: String, default: 'NEW' },
    state: { type: String, default: '' },
    dimensions: { type: Object, default: {} },
    payload: { type: Number, default: 0 }
  },
  {
    timestamps: true
  }
);

const Load = mongoose.model('Load', LoadSchema);

module.exports = Load;
