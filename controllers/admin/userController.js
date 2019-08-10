const mongoose = require('mongoose');

const User = mongoose.model('User');

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const getUser = (req, res, next) => {

};

module.exports = { getUsers, getUser };
