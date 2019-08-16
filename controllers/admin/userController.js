/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');

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
  await (new User(req.body.userData)).save();
  res.json({ status: 'success', msg: 'You have successfully add new user!' });
};

const updateUser = async (req, res) => {
  await User.findOneAndUpdate(
    { _id: req.params._id },
    { $set: req.body.tagData },
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
