const mongoose = require('mongoose');
const promisify = require('es6-promisify');

const User = mongoose.model('User');

const loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

const registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

const validateRegister = (req, res, next) => {
  req.sanitizeBody('fisrt_name');
  req.checkBody('first_name', 'You must supply a first name!').notEmpty();
  req.sanitizeBody('fisrt_name');
  req.checkBody('last_name', 'You must supply a last name!').notEmpty();
  req.checkBody('email', 'This email address is not valid!').notEmpty().isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });
  req.checkBody('password', 'You must supply password!').notEmpty();
  req.checkBody('password_confirmation', 'You must supply password confirmation!').notEmpty();
  req.checkBody('password_confirmation', 'Your password doesn\'t match!').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
    return;
  }

  next();
};

const register = async (req, res, next) => {
  const user = new User({
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  });
  const registerWithPromisify = promisify(User.register, User);
  await registerWithPromisify(user, req.body.password);
  next();
};

module.exports = {
  loginForm, registerForm, validateRegister, register,
};
