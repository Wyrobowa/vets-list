const express = require('express');

const router = express.Router();
const {
  homePage,
} = require('../controllers/indexController');
const {
  login,
  logout,
  isLoggedIn,
} = require('../controllers/authController');
const {
  loginForm,
  registerForm,
  validateRegister,
  register,
} = require('../controllers/userController');
const {
  getVets,
  getVetBySlug,
  addVet,
  uploadImages,
  saveAndResizeImages,
  removeImage,
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
router.post('/vet/:slug/edit', uploadImages, saveAndResizeImages, updateVet);
router.post('/vet/:slug/edit/remove', removeImage);
router.get('/add', isLoggedIn, addVet);
router.post('/add', uploadImages, saveAndResizeImages, createVet);
router.get('/tags', getTags);
router.get('/tags/add', isLoggedIn, addTag);
router.post('/tags/add', createTag);
router.post('/tags/remove', removeTag);
router.get('/top', getTop);
router.get('/contact', getContact);
router.get('/contact/add', isLoggedIn, addContact);
router.post('/contact/add', createContact);
router.post('/search', searchVets);
router.get('/login', loginForm);
router.post('/login', login);
router.get('/logout', logout);
router.get('/register', registerForm);
router.post('/register', validateRegister, register, login);

module.exports = router;
