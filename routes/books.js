const express = require('express');
const router = express.Router();
const booksController = require('../controllers/books');
const { ensureAuth } = require('../middleware/auth');

router.get('/', ensureAuth, booksController.getBooks);

router.post('/createBook', booksController.createBook);

// may be depriciated due to scope
router.put('/updateBook/:id', booksController.updateBook);

router.delete('/deleteBook/:id', booksController.deleteBook);

module.exports = router;
