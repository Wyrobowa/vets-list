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
  createVetRating,
} = require('../controllers/ratingControler');
const {
  getContact,
  editContact,
  updateContact,
} = require('../controllers/contactController');

const {
  sanitizeRequest,
} = require('../middlewares/sanitizeMiddleware');

router.get('/', homePage);
router.get('/vets', getVets);
router.post('/vets/rate', sanitizeRequest, createVetRating);
router.get('/vet/:slug', getVetBySlug);
router.post('/vet/:slug/rate', sanitizeRequest, createVetRating);
router.get('/vet/:slug/edit', editVet);
router.post('/vet/:slug/edit', sanitizeRequest, uploadImages, saveAndResizeImages, updateVet);
router.post('/vet/:slug/edit/remove', removeImage);
router.get('/vets/add', isLoggedIn, addVet);
router.post('/vets/add', sanitizeRequest, uploadImages, saveAndResizeImages, createVet);
router.get('/tags', getTags);
router.get('/tags/add', isLoggedIn, addTag);
router.post('/tags/add', sanitizeRequest, createTag);
router.post('/tags/remove', removeTag);
router.get('/top', getTop);
router.get('/contact', getContact);
router.get('/contact/edit', isLoggedIn, editContact);
router.post('/contact/edit', sanitizeRequest, updateContact);
router.get('/search', searchVets);
router.get('/login', loginForm);
router.post('/login', sanitizeRequest, login);
router.get('/logout', logout);
router.get('/register', registerForm);
router.post('/register', sanitizeRequest, validateRegister, register, login);
router.get('/account', isLoggedIn, account);
router.post('/account/edit', sanitizeRequest, updateAccount);
router.post('/account/forgot', sanitizeRequest, forgotPassword);
router.get('/account/reset/:token', resetPassword);
router.post('/account/reset/:token', sanitizeRequest, confirmedPassword, updatePassword);

router.get('panel');

module.exports = router;
