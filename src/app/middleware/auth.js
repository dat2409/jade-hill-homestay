var User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.requireAuth = function (req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized');
  }
  jwt.verify(req.cookies.token, process.env.JWTSECRET, function (err, decoded) {
    if (decoded == undefined) {
      res.status(401).send('Unauthorized');
    }
  });
  next();
};
