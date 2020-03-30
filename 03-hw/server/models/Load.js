const mongoose = require('mongoose');

const { LoadValidation } = require('../validation');

const LoadSchema = new mongoose.Schema(
  {
    creatorId: { type: String, required: true },
    assigneeId: { type: String, default: '' },
    logs: { type: Object, default: [] },
    status: { type: String, default: 'NEW' },
    state: { type: String, default: '' },
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
