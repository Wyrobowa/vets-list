const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ratingSchema = new mongoose.Schema({
  vet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vet',
  },
  rate: Number,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Rating', ratingSchema);
