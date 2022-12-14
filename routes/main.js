const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const postController = require('../controllers/feed');

const { ensureAuth } = require('../middleware/auth');

router.get('/', homeController.getWelcome);

router.get('/profile', ensureAuth, postController.getProfile);

router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.get('/logout', authController.logout);

router.get('/signup', authController.getSignup);

router.post('/signup', authController.postSignup);

module.exports = router;
