const Book = require('../models/Book');

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
        const book = req.body;
        try {
            await Book.create({
                title: book.title,
                author: book.author,
                pages: book.pages,
                rating: book.rating,
                desc: book.desc,
                tags: book.tags,
            });
            console.log(`${req.title} has been added!`);
            res.redirect('/feed');
        } catch (err) {
            console.log(err);
            res.redirect('/feed')
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
