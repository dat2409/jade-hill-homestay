var User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports.requireAuth = async function (req, res, next) {
  const token = req.headers.authorization.split(' ')[1];
  console.log(token);
  console.log(req.body)
  if (!token) {
    console.log('1');
    res.status(401).send('Unauthorized');
    console.log('2');
  }
  await jwt.verify(token, process.env.JWTSECRET, async function (err, decoded) {
    if (decoded == undefined) {
      console.log('3');
      res.status(401).send('Unauthorized');
      console.log('4');
    } else {
      await User.findOne({ _id: decoded.user_id })
      .then((u) => {
        console.log('5');
        req.user = u;
      })
    }
  });
  next();
}
