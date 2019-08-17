const sanitize = require('mongo-sanitize');

const sanitizeRequest = (req, res, next) => {
  req.body = sanitize(req.body);
  next();
};

module.exports = { sanitizeRequest };
