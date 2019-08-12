const express = require('express');

const router = express.Router();
const {
  getUsers,
} = require('../controllers/admin/userController');
const {
  getVets,
} = require('../controllers/admin/vetsController');
const {
  getTags,
} = require('../controllers/admin/tagsController');
const {
  getContact,
  updateContact,
} = require('../controllers/admin/contactController');

router.get('/', getUsers);
router.get('/users', getUsers);
router.get('/vets', getVets);
router.get('/tags', getTags);
router.get('/contact', getContact);
router.post('/contact/edit', updateContact);

module.exports = router;
