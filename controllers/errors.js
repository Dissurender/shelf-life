module.exports = {
  get404: (req, res) => {
    res.render('404.ejs', { nav: false });
  },
};
