const mongoose = require('mongoose');
const enumValues = require('mongoose-enumvalues');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email address!'],
    required: 'Please supply and email address!',
  },
  first_name: {
    type: String,
    required: 'Please supply a first name!',
    trim: true,
  },
  last_name: {
    type: String,
    required: 'Please supply a last name!',
    trim: true,
  },
  level: {
    type: String,
    enum: ['admin', 'editor'],
    required: 'You must supply user level of permissions!',
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

const enumOptions = {
  virtual: {
    only: ['level'],
    properties: {
      level: 'levels',
    },
  },
};

userSchema.plugin(enumValues, enumOptions);
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
