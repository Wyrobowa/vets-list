const express = require('express');

const router = express.Router();
const {
  homePage,
} = require('../controllers/indexController');
const {
  login,
  logout,
  isLoggedIn,
  forgotPassword,
  resetPassword,
  confirmedPassword,
  updatePassword,
} = require('../controllers/authController');
const {
  loginForm,
  registerForm,
  validateRegister,
  register,
  account,
  updateAccount,
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
  editContact,
  updateContact,
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
router.get('/contact/edit', isLoggedIn, editContact);
router.post('/contact/edit', updateContact);
router.post('/search', searchVets);
router.get('/login', loginForm);
router.post('/login', login);
router.get('/logout', logout);
router.get('/register', registerForm);
router.post('/register', validateRegister, register, login);
router.get('/account', isLoggedIn, account);
router.post('/account/edit', updateAccount);
router.post('/account/forgot', forgotPassword);
router.get('/account/reset/:token', resetPassword);
router.post('/account/reset/:token', confirmedPassword, updatePassword);

module.exports = router;
