const cloudinary = require('../middleware/cloudinary');
const Book = require('../models/Book');
const Comment = require('../models/Comment');

module.exports = {
    getProfile: async (req, res) => {
        try {
            const books = await Book.find({ user: req.user.id });
            res.render('profile.ejs', { books: books, user: req.user });
        } catch (err) {
            console.log(err);
        }
    },
    getFeed: async (req, res) => {
        try {
            const books = await Book.find().sort({ createdAt: 'desc' }).lean();
            res.render('feed.ejs', { books: books });
        } catch (err) {
            console.log(err);
        }
    },
    getPost: async (req, res) => {
        try {
            const book = await Book.findById(req.params.id);
            const comments = await Comment.find({ book: req.params.id })
                .sort({ createdAt: 'desc' })
                .lean();
            res.render('book.ejs', {
                book: book,
                user: req.user,
                comments: comments,
            });
        } catch (err) {
            console.log(err);
        }
    },
    createPost: async (req, res) => {
        try {
            // Upload image to cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);

            await Book.create({
                title: req.body.title,
                image: result.secure_url,
                cloudinaryId: result.public_id,
                caption: req.body.caption,
                likes: 0,
                user: req.user.id,
            });
            console.log('Book has been added!');
            res.redirect('/profile');
        } catch (err) {
            console.log(err);
        }
    },
    likePost: async (req, res) => {
        try {
            await Book.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $inc: { likes: 1 },
                }
            );
            console.log('Likes +1');
            res.redirect(`/book/${req.params.id}`);
        } catch (err) {
            console.log(err);
        }
    },
    deletePost: async (req, res) => {
        try {
            // Find book by id
            let book = await Book.findById({ _id: req.params.id });
            // Delete image from cloudinary
            await cloudinary.uploader.destroy(book.cloudinaryId);
            // Delete book from db
            await Book.remove({ _id: req.params.id });
            console.log('Deleted Book');
            res.redirect('/profile');
        } catch (err) {
            res.redirect('/profile');
        }
    },
};
