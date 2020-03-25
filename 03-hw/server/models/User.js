const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  info: { type: String, default: '' }
});
// UserSchema.set('toJSON', { getters: true, virtuals: false });

const User = mongoose.model('User', UserSchema);

module.exports = User;
