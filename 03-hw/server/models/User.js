const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { saltFactor } = require('config').get('password');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String
      // validate: {
      //   validator: username => User.doesntExist(username),
      //   message: ({ value }) => `Username ${value} has already been taken`
      // }
    },
    password: { type: String },
    role: { type: String },
    email: {
      type: String
      // validate: {
      //   validator: email => User.doesntExist(email),
      //   message: ({ value }) => `Email ${value} has already been taken`
      // }
    },
    phone: { type: String, default: '' },
    info: { type: String, default: '' }
  },
  {
    timestamps: true
  }
);

UserSchema.statics.doesntExist = async function(options) {
  return (await this.where(options).countDocuments()) === 0;
};

UserSchema.pre('save', async function save(next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(saltFactor);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.validatePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
