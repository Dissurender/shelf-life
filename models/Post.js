const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    },
    likes: { type: Number },
    userId: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Post', PostSchema);
