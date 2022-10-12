const Book = require('../models/Book');

/*
 * endpoint controll for user favorites
 * array in DB
 */

module.exports = {
    getBooks: async (req, res) => {
        console.log(req.user);
        try {
            const BookItems = await Book.find({ userId: req.user.id });
            res.render('books.ejs', {
                Books: BookItems,
                user: req.user,
            });
        } catch (err) {
            console.log(err);
        }
    },
    createBook: async (req, res) => {
        try {
            await Book.create({
                Book: req.body.BookItem,
                userId: req.user.id,
            });
            console.log(`${req.title} has been added!`);
            res.redirect('/feed');
        } catch (err) {
            console.log(err);
        }
    },
    updateBook: async (req, res) => {
        try {
            await Book.findOneAndUpdate(
                { _id: req.params.id },
                {
                    completed: false,
                }
            );
            console.log(`${req.title} has been updated`);
            res.json('Marked Incomplete');
        } catch (err) {
            console.log(err);
        }
    },
    deleteBook: async (req, res) => {
        console.log(req.params.id);
        try {
            await Book.findOneAndDelete({ _id: req.body.BookIdFromJSFile });
            console.log(`${req.params.id} has been removed.`);
            res.json('Deleted It');
        } catch (err) {
            console.log(err);
        }
    },
};
