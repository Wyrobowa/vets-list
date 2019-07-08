const express = require('express');

const router = express.Router();
const { homePage } = require('../controllers/indexController');
const {
  getVets,
  getVetBySlug,
  addVet,
  upload,
  resize,
  createVet,
  editVet,
  updateVet,
  getTop,
  searchVets,
} = require('../controllers/vetsController');
const {
  getTags,
  addTag,
  createTag,
  removeTag,
} = require('../controllers/tagsController');
const {
  getContact,
  addContact,
  createContact,
} = require('../controllers/contactController');

router.get('/', homePage);
router.get('/vets', getVets);
router.get('/vet/:slug', getVetBySlug);
router.get('/vet/:slug/edit', editVet);
router.post('/vet/:slug/edit', upload, resize, updateVet);
router.get('/add', addVet);
router.post('/add', upload, resize, createVet);
router.get('/tags', getTags);
router.get('/tags/add', addTag);
router.post('/tags/add', createTag);
router.post('/tags/remove', removeTag);
router.get('/top', getTop);
router.get('/contact', getContact);
router.get('/contact/add', addContact);
router.post('/contact/add', createContact);
router.post('/search', searchVets);

module.exports = router;
