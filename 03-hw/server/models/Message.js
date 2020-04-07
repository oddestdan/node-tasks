const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    handle: { type: String },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
