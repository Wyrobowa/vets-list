/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

const Tag = mongoose.model('Tag');
const Vet = mongoose.model('Vet');

const getTags = async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
};

const getTag = async (req, res) => {
  const tag = await Tag.findOne({ _id: req.params._id });
  res.json(tag);
};

const createTag = async (req, res) => {
  await (new Tag(req.body.tagData)).save();
  res.json({ status: 'success', msg: 'You have successfully add new tag!' });
};

const updateTag = async (req, res) => {
  await Tag.findOneAndUpdate(
    { _id: req.params._id },
    { $set: req.body.tagData },
  );

  res.json({ status: 'success', msg: 'You have successfully updated tag!' });
};

const removeTag = async (req, res) => {
  await Tag.findByIdAndDelete(req.params._id);
  await Vet.find({ tags: req.params._id });
  res.json({ status: 'success', msg: 'You have successfully delete tag!' });
};

module.exports = {
  getTags, getTag, createTag, updateTag, removeTag,
};
