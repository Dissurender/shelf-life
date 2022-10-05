const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    pages: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
    },
});

module.exports = mongoose.model('Book', BookSchema);
