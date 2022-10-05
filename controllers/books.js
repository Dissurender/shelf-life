const Book = require('../models/Book');

module.exports = {
    getBooks: async (req, res) => {
        console.log(req.user);
        try {
            const BookItems = await Book.find({ userId: req.user.id });
            const itemsLeft = await Book.countDocuments({
                userId: req.user.id,
                completed: false,
            });
            res.render('books.ejs', {
                Books: BookItems,
                left: itemsLeft,
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
                completed: false,
                userId: req.user.id,
            });
            console.log(`${req.title} has been added!`);
            res.redirect('/books');
        } catch (err) {
            console.log(err);
        }
    },
    updateBook: async (req, res) => {
        try {
            await Book.findOneAndUpdate(
                { _id: req.body.BookIdFromJSFile },
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
        console.log(req.body.BookIdFromJSFile);
        try {
            await Book.findOneAndDelete({ _id: req.body.BookIdFromJSFile });
            console.log(`${req.title} has been removed.`);
            res.json('Deleted It');
        } catch (err) {
            console.log(err);
        }
    },
};
