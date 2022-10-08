module.exports = {
    getIndex: (req, res) => {
        res.render('welcome.ejs', { nav: false });
    },
};
