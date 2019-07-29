const passport = require('passport');

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

module.exports = { login, logout, isLoggedIn };
