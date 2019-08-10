/* eslint-disable func-names */
const mongoose = require('mongoose');
const slug = require('slugs');

mongoose.Promise = global.Promise;

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a tag name!',
  },
  slug: String,
  created: {
    type: Date,
    default: Date.now,
  },
});

tagSchema.pre('save', async function (next) {
  if (!this.isModified('name')) return next();
  this.slug = slug(this.name);
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const tagsWithSlug = await this.constructor.find({ slug: slugRegEx });

  if (tagsWithSlug.length) {
    this.slug = `${this.slug}-${tagsWithSlug.length + 1}`;
  }

  next();
});

module.exports = mongoose.model('Tag', tagSchema);
