const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Please enter a vets name!'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

tagSchema.pre('save', async function (next) {
    
});

module.exports = mongoose.model('Tag', tagSchema);
