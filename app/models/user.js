const
  mongoose = require('mongoose'),
  validator = require('validator'),
  jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'expected {VALUE} to be a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.generateAuthToken = function(callback){
  const
    user = this,
    access = 'auth',
    token = jwt.sign({access, _id: user._id.toHexString()}, process.env.JWT);

  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(()=> token);
};

UserSchema.statics.findByToken = function(cryptedToken){
  const
    User = this,
    token = jwt.verify(cryptedToken, process.env.JWT);
  return User.findOne({'_id': token._id, 'tokens.access' : token.access, 'tokens.token': cryptedToken});
};

const User = mongoose.model('User', UserSchema);


module.exports = User;