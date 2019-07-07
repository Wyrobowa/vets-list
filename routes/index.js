const express = require('express');

const router = express.Router();
const {
  homePage,
  getVets,
  getVetBySlug,
  addVet,
  createVet,
  editVet,
  updateVet,
  getTop,
} = require('../controllers/vetsController');
const {
  getTags,
  addTag,
  createTag,
  removeTag,
} = require('../controllers/tagsController');

router.get('/', homePage);
router.get('/vets', getVets);
router.get('/vet/:slug', getVetBySlug);
router.get('/vet/:slug/edit', editVet);
router.post('/vet/:slug/edit', updateVet);
router.get('/add', addVet);
router.post('/add', createVet);
router.get('/tags', getTags);
router.get('/tags/add', addTag);
router.post('/tags/add', createTag);
router.post('/tags/remove', removeTag);
router.get('/top', getTop);

module.exports = router;
