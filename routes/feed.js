const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const feedController = require('../controllers/feed');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

//Post Routes - simplified for now
router.get('/', ensureAuth, feedController.getFeed)

router.get('/guest', ensureGuest, feedController.getGuestFeed)

router.get('/:id', ensureAuth, feedController.getPost);

router.post('/createPost', upload.single('file'), feedController.createPost);

router.put('/likePost/:id', feedController.likePost);

router.delete('/deletePost/:id', feedController.deletePost);

module.exports = router;
