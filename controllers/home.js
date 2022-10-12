module.exports = {
    getWelcome: (req, res) => {
        res.render('welcome.ejs', { nav: false });
    },
};
