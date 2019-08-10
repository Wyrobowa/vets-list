/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
const mongoose = require('mongoose');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');
const starRatings = require('star-ratings');

const Vet = mongoose.model('Vet');
const Tag = mongoose.model('Tag');
const User = mongoose.model('User');
const Rating = mongoose.model('Rating');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed' }, false);
    }
  },
};

const getVets = async (req, res) => {
  const vetsList = await Vet.find().populate('ratings');
  res.render('vets', { title: 'Vets List', vets: vetsList });
};

const getVetBySlug = async (req, res, next) => {
  const vet = await Vet.findOne({ slug: req.params.slug }).populate('user').populate('tags').populate('ratings');
  if (!vet) return next();

  const vetRatings = [
    await Rating.find({ vet: vet._id, rate: 1 }).countDocuments(),
    await Rating.find({ vet: vet._id, rate: 2 }).countDocuments(),
    await Rating.find({ vet: vet._id, rate: 3 }).countDocuments(),
    await Rating.find({ vet: vet._id, rate: 4 }).countDocuments(),
    await Rating.find({ vet: vet._id, rate: 5 }).countDocuments(),
  ];
  const averageRate = starRatings(vetRatings);
  res.render('vet', { title: vet.name, vet, averageRate });
};

const addVet = async (req, res) => {
  const tags = await Tag.find();
  const editors = await User.find({ level: 'editor' });
  res.render('editVet', {
    title: 'Add Vet', tags, editors, formAction: '/vets/add',
  });
};

const uploadImages = multer(multerOptions).fields([
  { name: 'vet_logo', maxCount: 1 },
  { name: 'vet_gallery', maxCount: 10 },
]);

async function save(vetImages) {
  const images = [];
  for (const item in vetImages) {
    if (Object.prototype.hasOwnProperty.call(vetImages, item)) {
      const image = vetImages[item];
      const extension = image.mimetype.split('/')[1];
      const imageName = `${uuid.v4()}.${extension}`;
      images.push(imageName);
      image.newName = imageName;
    }
  }
  return images;
}

function resize(vetImages, path) {
  vetImages.forEach(async (item) => {
    const photo = await jimp.read(item.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(path + item.newName);
  });
}

const saveAndResizeImages = async (req, res, next) => {
  if (!req.files) return next();
  if (req.files.vet_logo) {
    req.body.vet_logo = await save(req.files.vet_logo);
    resize(req.files.vet_logo, `./public/uploads/vets_logos/${req.params.slug}/`);
  }
  if (req.files.vet_gallery) {
    req.vetGallery = await save(req.files.vet_gallery);
    resize(req.files.vet_gallery, `./public/uploads/vets_galleries/${req.params.slug}/`);
  }
  next();
};

const removeImage = async (req, res) => {
  await Vet.findOneAndUpdate({ vet_gallery: req.body.imageName }, { $pull: { vet_gallery: req.body.imageName } });
  res.send({ status: 'successful' });
};

const createVet = async (req, res) => {
  await (new Vet(req.body)).save();
  res.redirect('/vets');
};

const confirmOwner = (vet, user) => {
  const vetEditors = vet.editors || [];
  const parsedVetEditors = vetEditors.join(',').split(',');
  if ((user.level !== 'admin') && (vet.editors && !(parsedVetEditors.includes(user._id.toString())))) {
    throw Error('You don\'t have permissions to edit this vet!');
  }
};

const editVet = async (req, res, next) => {
  const vet = await Vet.findOne({ slug: req.params.slug });
  if (!vet) return next();

  confirmOwner(vet, req.user);
  const tags = await Tag.find();
  const editors = await User.find({ level: 'editor' });

  res.render('editVet', {
    title: `Edit Vet: ${vet.name}`, vet, tags, editors, formAction: `/vet/${vet.slug}/edit`,
  });
};

const updateVet = async (req, res) => {
  let push = {};
  if (req.vetGallery) {
    push = { $push: { vet_gallery: req.vetGallery }, ...req.body };
  } else {
    push = req.body;
  }
  const vet = await Vet.findOneAndUpdate({ slug: req.params.slug }, push);
  res.redirect(`/vet/${vet.slug}`);
};

const getTop = async (req, res) => {
  const vetsList = await Vet.find().sort({ average_rate: -1 }).limit(10);
  res.render('vets', { title: 'Top 10 Vets', vets: vetsList });
};

const searchVets = async (req, res) => {
  const vetsList = await Vet.find({
    $text: {
      $search: req.query.q,
    },
  }, {
    score: { $meta: 'textScore' },
  }).sort({
    score: { $meta: 'textScore' },
  });
  res.json(vetsList);
};

module.exports = {
  getVets, getVetBySlug, addVet, uploadImages, saveAndResizeImages, removeImage, createVet, editVet, updateVet, getTop, searchVets,
};
