/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const starRatings = require('star-ratings');

const Rating = mongoose.model('Rating');
const Vet = mongoose.model('Vet');

const createVetRating = async (req, res) => {
  const set = {
    vet: req.body.vet,
    rate: req.body.rate,
  };
  await (new Rating(set)).save();

  const vetRatings = [
    await Rating.find({ vet: req.body.vet, rate: 1 }).countDocuments(),
    await Rating.find({ vet: req.body.vet, rate: 2 }).countDocuments(),
    await Rating.find({ vet: req.body.vet, rate: 3 }).countDocuments(),
    await Rating.find({ vet: req.body.vet, rate: 4 }).countDocuments(),
    await Rating.find({ vet: req.body.vet, rate: 5 }).countDocuments(),
  ];
  const averageRate = starRatings(vetRatings);
  await Vet.findOneAndUpdate({ _id: req.body.vet }, { average_rate: averageRate });

  res.json({ averageRate });
};

module.exports = { createVetRating };
