/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
const mongoose = require('mongoose');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const Vet = mongoose.model('Vet');
const Tag = mongoose.model('Tag');

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
  const vetsList = await Vet.find();
  res.render('vets', { title: 'Vets List', vets: vetsList });
};

const getVetBySlug = async (req, res, next) => {
  const vet = await Vet.findOne({ slug: req.params.slug });
  const tags = await Tag.find({
    _id: { $in: vet.tags },
  });
  if (!vet) return next();
  res.render('vet', { title: vet.name, vet, tags });
};

const addVet = async (req, res) => {
  const tags = await Tag.find();
  res.render('edit', { title: 'Add Vet', tags, formAction: '/add' });
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
    req.body.vet_gallery = await save(req.files.vet_gallery);
    resize(req.files.vet_gallery, `./public/uploads/vets_galleries/${req.params.slug}/`);
  }
  next();
};

const createVet = async (req, res) => {
  await (new Vet(req.body)).save();
  res.redirect('/vets');
};

const editVet = async (req, res, next) => {
  const vet = await Vet.findOne({ slug: req.params.slug });
  if (!vet) return next();
  const tags = await Tag.find();
  res.render('edit', {
    title: `Edit Vet: ${vet.name}`, vet, tags, formAction: `/vet/${vet.slug}/edit`,
  });
};

const updateVet = async (req, res) => {
  const vet = await Vet.findOneAndUpdate({ slug: req.params.slug }, req.body);
  res.redirect(`/vet/${vet.slug}`);
};

const getTop = async (req, res) => {
  const vetsList = await Vet.find().sort({ rate: -1 }).limit(10);
  res.render('vets', { title: 'Top 10 Vets', vets: vetsList });
};

const searchVets = async (req, res) => {
  const vetsList = await Vet.find({ name: { $regex: req.body.search, $options: 'i' } });
  res.render('vets', { title: `Results for "${req.body.search}"`, vets: vetsList });
};

module.exports = {
  getVets, getVetBySlug, addVet, uploadImages, saveAndResizeImages, createVet, editVet, updateVet, getTop, searchVets,
};
