const cloudinary = require('../middleware/cloudinary');
const Book = require('../models/Book');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const books = await Book.find({ user: req.user.id });
      res.render('profile.ejs', {
        books: books,
        user: req.user,
        nav: true,
      });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: 'desc' }).lean();
      res.render('feed.ejs', { posts: posts, user: req.user, nav: true });
    } catch (err) {
      console.log(err);
    }
  },
  getGuestFeed: async (req, res) => {
    try {
      const posts = await Post.find().sort({ createdAt: 'desc' }).lean();
      res.render('feed.ejs', { posts: posts, user: false, nav: false });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const book = await Post.findById(req.params.id);
      const comments = await Comment.find({ post: req.params.id })
        .sort({ createdAt: 'desc' })
        .lean();
      res.render('book.ejs', {
        book: book,
        user: req.user,
        comments: comments,
      });
    } catch (err) {
      res.render('404.ejs', { nav: false });
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
      });
      console.log('Post has been added!');
      res.redirect('/feed');
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log('Likes +1');
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find book by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete book from db
      await Post.remove({ _id: req.params.id });
      console.log('Deleted Post');
      res.redirect('/feed');
    } catch (err) {
      res.redirect('/feed');
    }
  },
};
