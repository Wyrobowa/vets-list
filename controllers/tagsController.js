/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const Tag = mongoose.model('Tag');
const Vet = mongoose.model('Vet');

const getTags = async (req, res) => {
  const tagsList = await Tag.find();
  res.render('tags', { title: 'Tags', tags: tagsList });
};

const addTag = (req, res) => {
  res.render('addTag', { title: 'Add Tag' });
};

const createTag = async (req, res) => {
  await (new Tag(req.body)).save();
  res.redirect('/tags');
};

const removeTag = async (req, res) => {
  await Tag.findByIdAndDelete(req.body.tagId);
  await Vet.find({ tags: req.body.tagId });
  res.send({ status: 'successful' });
};

const getVetsListByTag = async (req, res) => {
  const tags = await Tag.find();
  const activeTag = await Tag.findOne({ slug: req.params.slug });
  const vets = await Vet.find({ tags: { $all: [activeTag._id] } });
  res.render('vetsByTag', {
    title: 'Tags', tags, activeTag, vets,
  });
};

module.exports = {
  getTags,
  addTag,
  createTag,
  removeTag,
  getVetsListByTag,
};
