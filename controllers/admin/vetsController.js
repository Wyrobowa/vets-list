const mongoose = require('mongoose');

const Vet = mongoose.model('Vet');
const Tag = mongoose.model('Tag');
const User = mongoose.model('User');

const getVets = async (req, res) => {
  const vets = await Vet.find().populate('tags');
  res.json(vets);
};

const getVet = async (req, res) => {
  const vet = await Vet.findOne({ slug: req.params.slug }).populate('tags').populate('editors');
  const tags = await Tag.find();
  const editors = await User.find({ level: 'editor' });
  res.json({ vet, tags, editors });
};

module.exports = { getVets, getVet };
