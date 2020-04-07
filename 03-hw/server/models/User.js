const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { saltFactor } = require('config').get('password');

const { UserValidation } = require('../validation');

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      validate: {
        validator: username => User.doesntExistWith({ username }),
        message: ({ value }) => `Username ${value} is already taken`
      }
    },
    password: { type: String },
    role: { type: String },
    email: {
      type: String,
      validate: {
        validator: email => User.doesntExistWith({ email }),
        message: ({ value }) => `Email ${value} is already taken`
      }
    },
    phone: { type: String, default: '' },
    info: { type: String, default: '' },
    avatar: { type: String, default: '' },
  },
  {
    timestamps: true
  }
);

UserSchema.statics.doesntExistWith = async function(options) {
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

UserSchema.statics.joiValidate = data => UserValidation.validate(data);

const User = mongoose.model('User', UserSchema);

module.exports = User;
