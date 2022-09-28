const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, booksController.getBooks);

router.post('/createBook', booksController.createBook);

router.put('/updateBook', booksController.updateBook);

router.delete('/deleteBook', booksController.deleteBook);

module.exports = router;
