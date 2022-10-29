const Post = require('../models/Post');

// Expand post and show discussion

module.exports = {
    getPost: async (req, res) => {
      try {
        const post = await Post.findOne({ post: req.post.id });
        res.render('post.ejs', {
          post: post,
          user: req.user,
          nav: true,
        });
      } catch (err) {
        //handle error
        console.log(err);
      }
    },
};