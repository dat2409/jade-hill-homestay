var User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.requireAuth = async function (req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized');
  }
  await jwt.verify(
    req.cookies.token,
    process.env.JWTSECRET,
    async function (err, decoded) {
      if (decoded == undefined) {
        res.status(401).send('Unauthorized');
      } else {
        await User.findOne({ _id: decoded.user_id }).then((u) => {
          req.user = u;
          next();
        });
      }
    }
  );
};
