const express = require('express');

const router = express.Router();
const {
  getUsers,
  getUser,
  getUserLevels,
  createUser,
  updateUser,
  removeUser,
} = require('../controllers/admin/userController');
const {
  getVets,
  getVet,
} = require('../controllers/admin/vetsController');
const {
  getTags,
  getTag,
  createTag,
  updateTag,
  removeTag,
} = require('../controllers/admin/tagsController');
const {
  getContact,
  updateContact,
} = require('../controllers/admin/contactController');

router.get('/', getUsers);
router.get('/users', getUsers);
router.get('/user/add', getUserLevels);
router.post('/user/add', createUser);
router.get('/user/:_id/edit', getUser);
router.post('/user/:_id/edit', updateUser);
router.post('/user/:_id/delete', removeUser);
router.get('/vets', getVets);
router.get('/vet/:slug/edit', getVet);
router.get('/tags', getTags);
router.post('/tag/add', createTag);
router.get('/tag/:_id/edit', getTag);
router.post('/tag/:_id/edit', updateTag);
router.post('/tag/:_id/delete', removeTag);
router.get('/contact', getContact);
router.post('/contact/edit', updateContact);

module.exports = router;
