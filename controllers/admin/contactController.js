const mongoose = require('mongoose');

const Contact = mongoose.model('Contact');

const getContact = async (req, res) => {
  const contact = await Contact.findOne();
  res.json(contact);
};

const updateContact = async (req, res) => {
  const contact = await Contact.findOneAndUpdate(
    { email: req.body.parsedData.email },
    { $set: req.body.parsedData },
  );

  if (!contact) {
    await (new Contact(req.body)).save();
  }

  res.redirect('/admin/#/admin/contact');
};

module.exports = { getContact, updateContact };
