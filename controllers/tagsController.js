const mongoose = require('mongoose');
const Tag = mongoose.model('Tag');

const getTags = async (req, res) => {
    const tagsList = await Tag.find();
    res.render('tags', { title: 'Tags', tags: tagsList });
};

const addTag = (req, res) => {
    res.render('addTag', { title: 'Add Tag' });
}

const createTag = async (req, res) => {
    await (new Tag(req.body)).save();
    res.redirect('/tags');
};

module.exports = { getTags, addTag, createTag };
