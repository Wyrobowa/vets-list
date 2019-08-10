const mongoose = require('mongoose');

const Vet = mongoose.model('Vet');

const getVets = async (req, res) => {
  const vets = await Vet.find().populate('tags');
  res.json(vets);
};

const getVet = (req, res, next) => {

};

module.exports = { getVets, getVet };
