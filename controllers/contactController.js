const mongoose = require('mongoose');

const Contact = mongoose.model('Contact');

const getContact = async (req, res) => {
  const contact = await Contact.findOne();
  res.render('contact', { title: 'Contact', contact });
};

const editContact = async (req, res) => {
  const contact = await Contact.findOne();
  res.render('editContact', { title: 'Edit Contact', contact });
};

const updateContact = async (req, res) => {
  const contact = await Contact.findOneAndUpdate(
    { email: req.body.email },
    { $set: req.body },
  );

  if (!contact) {
    await (new Contact(req.body)).save();
    res.redirect('/contact');
  }

  req.flash('success', 'You have updated contact info!');
  res.redirect('/contact');
};

module.exports = { getContact, editContact, updateContact };
