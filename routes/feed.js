const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const feedController = require('../controllers/feed');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, feedController.getFeed);

// anon access to feed
router.get('/guest', ensureGuest, feedController.getGuestFeed);

// direct entry point to single
router.get('/:id', ensureAuth, feedController.getPost);

router.post('/createPost', upload.single('file'), feedController.createPost);

router.put('/likePost/:id', feedController.likePost);

router.delete('/deletePost/:id', feedController.deletePost);

module.exports = router;
