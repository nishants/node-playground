const
  mongoose = require('mongoose'),
  validator = require('validator');

const User = mongoose.model('User', {
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message  : 'expected {VALUE} to be a valid email'
    }
  }
});

module.exports = User;