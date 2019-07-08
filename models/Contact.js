const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const contactSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
  },
  phone: Number,
  location: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: [{
      type: Number,
    }],
    address: {
      type: String,
    },
  },
});

module.exports = mongoose.model('Contact', contactSchema);
