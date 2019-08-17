/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const promisify = require('es6-promisify');

const User = mongoose.model('User');
const Vet = mongoose.model('Vet');

const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params._id });
  res.json({ user, levels: user.levels });
};

const getUserLevels = async (req, res) => {
  const user = new User();
  res.json({ levels: user.levels });
};

const createUser = async (req, res) => {
  const user = new User({
    email: req.body.userData.user.email,
    first_name: req.body.userData.user.first_name,
    last_name: req.body.userData.user.last_name,
    level: req.body.userData.user.level,
  });
  const createWithPromisify = promisify(User.register, User);
  await createWithPromisify(user, req.body.userData.user.password);
  res.json({ status: 'success', msg: 'You have successfully created user!' });
};

const updateUser = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.params._id },
    { $set: req.body.userData.user },
  );

  res.json({ status: 'success', msg: 'You have successfully updated user!' });
};

const removeUser = async (req, res) => {
  await User.findByIdAndDelete(req.params._id);
  await Vet.find({ editors: req.params._id });
  res.json({ status: 'success', msg: 'You have successfully delete user!' });
};

module.exports = {
  getUsers, getUser, getUserLevels, createUser, updateUser, removeUser,
};
