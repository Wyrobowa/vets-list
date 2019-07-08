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
  res.render('vets', { vets: vetsList });
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

const upload = multer(multerOptions).single('vet_logo');

const resize = async (req, res, next) => {
  if (!req.file) return next();

  const extension = req.file.mimetype.split('/')[1];
  req.body.vet_logo = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.vet_logo}`);
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
  res.render('vets', { vets: vetsList });
};

const searchVets = async (req, res) => {
  const vetsList = await Vet.find({ name: { $regex: req.body.search, $options: 'i' } });
  res.render('vets', { title: `Results for "${req.body.search}"`, vets: vetsList });
};

module.exports = {
  getVets, getVetBySlug, addVet, upload, resize, createVet, editVet, updateVet, getTop, searchVets,
};
