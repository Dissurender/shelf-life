const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    Post: {
        type: String,
        required: true,
    },
    Book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    likes: { type: Number },
    userId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Post', PostSchema);
