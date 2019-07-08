const homePage = (req, res) => {
  res.render('index', { title: 'Veterinarians List' });
};

module.exports = { homePage };
