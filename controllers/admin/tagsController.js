const mongoose = require('mongoose');

const Tag = mongoose.model('Tag');

const getTags = async (req, res) => {
  const tags = await Tag.find();
  res.json(tags);
};

const getTag = (req, res, next) => {

};

module.exports = { getTags, getTag };
