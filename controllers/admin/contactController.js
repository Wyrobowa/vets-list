const mongoose = require('mongoose');

const Contact = mongoose.model('Contact');

const getContact = async (req, res) => {
  const contact = await Contact.findOne();
  res.json(contact);
};

const updateContact = async (req, res) => {
  const contact = await Contact.findOneAndUpdate(
    { email: req.body.contact.email },
    { $set: req.body.contact },
  );

  if (!contact) {
    await (new Contact(req.body)).save();
  }

  res.json({ status: 'success', msg: 'You have successfully updated contact info!' });
};

module.exports = { getContact, updateContact };
