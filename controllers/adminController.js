const admin = (req, res) => {
  res.render('admin/admin', { title: 'Admin Panel' });
};

module.exports = { admin };
