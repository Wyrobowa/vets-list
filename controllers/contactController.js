const mongoose = require('mongoose');

const Contact = mongoose.model('Contact');

const getContact = async (req, res) => {
  const contact = await Contact.findOne();
  res.render('contact', { title: 'Contact', contact });
};

const addContact = (req, res) => {
  res.render('addContact', { title: 'Add contact' });
};

const createContact = async (req, res) => {
  await (new Contact(req.body)).save();
  res.redirect('/contact');
};

module.exports = { getContact, addContact, createContact };
