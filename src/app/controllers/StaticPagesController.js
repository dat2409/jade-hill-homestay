const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class StaticPagesController {
  // if have error, next called
  home(req, res, next) {
    res.render('home');
  }
  handleLogin(req, res, next) {
    User.findOne({ email: req.body.email }).then((u) => {
      if (u) {
        u = u.toObject();
        bcrypt
          .compare(req.body.password, u.password)
          .then(async function (result) {
            if (result) {
              const token = await jwt.sign(
                {
                  user_id: u._id,
                  name: u.first_name,
                },
                process.env.JWTSECRET,
                {
                  expiresIn: '2h',
                }
              );
              res.cookie('token', token);
              res.send(token);
            } else res.status(401).send('wrong password');
          });
      } else res.status(404).send('account not found');
    });
  }
  test(req, res, next) {
    console.log('222222222222', req.user);
    res.send('123');
  }
}

module.exports = new StaticPagesController();
