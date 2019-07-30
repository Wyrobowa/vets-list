const passport = require('passport');
const mongoose = require('mongoose');
const crypto = require('crypto');
const promisify = require('es6-promisify');
const mail = require('../handlers/mail');

const User = mongoose.model('User');

const login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed login!',
  successRedirect: '/',
  successFlash: 'You are logged in!',
});

const logout = (req, res) => {
  req.logout();
  req.flash('success', 'You have been successfully logged out!');
  res.redirect('/');
};

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error', 'You must be logged in to do that!');
  res.redirect('/login');
};

const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash('success', 'You have been emailed a password reset link!');
    res.redirect('/login');
  }
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 360000;

  await user.save();

  const resetURL = `http://${req.headers.host}/account/reset/${user.resetPasswordToken}`;
  await mail.send({
    user,
    filename: 'password-reset',
    subject: 'Password Reset',
    resetURL,
  });
  req.flash('success', 'You have been emailed a password reset link!');
  res.redirect('/login');
};

const resetPassword = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired!');
    return res.redirect('/login');
  }

  res.render('resetPassword', { title: 'Reset your password' });
};

const confirmedPassword = (req, res, next) => {
  if (req.body.password === req.body.password_confirmation) {
    next();
    return;
  }
  req.flash('error', 'Your password doesn\'t match!');
  res.redirect('back');
};

const updatePassword = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired!');
    return res.redirect('/login');
  }

  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();
  await req.login(updatedUser);
  req.flash('success', 'Your password has been changed!');
  res.redirect('/');
};

module.exports = {
  login, logout, isLoggedIn, forgotPassword, resetPassword, confirmedPassword, updatePassword,
};
