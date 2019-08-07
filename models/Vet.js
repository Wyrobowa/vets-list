/* eslint-disable func-names */
const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const vetSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a vets name!',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  average_rate: Number,
  tags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
  }],
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
  vet_logo: String,
  vet_gallery: [String],
  editors: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an user!',
  }],
  created: {
    type: Date,
    default: Date.now,
  },
});

vetSchema.pre('save', async function (next) {
  if (!this.isModified('name')) return next();
  this.slug = slug(this.name);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const vetsWithSlug = await this.constructor.find({ slug: slugRegEx });

  if (vetsWithSlug.length) {
    this.slug = `${this.slug}-${vetsWithSlug.length + 1}`;
  }

  next();
});

module.exports = mongoose.model('Vet', vetSchema);
