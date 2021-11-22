const bcrypt = require('bcrypt');
const User = require('../models/user');
const Role = require('../models/role');
const { createUserValidator } = require('../validation/userAuth');
const mongoose = require('../../util/mongoose');

class UserController {
  //GET /users/new
  create(req, res, next) {
    res.send('create user page');
  }

  //POST /users/store
  async store(req, res, next) {
    const { error } = createUserValidator(req.body);

    if (error) return res.status(422).send(error.details[0].message);

    const checkEmailExist = await User.findOne({ email: req.body.email });

    if (checkEmailExist) return res.status(422).send('Email already exists!');

    /**
      genSalt() quy định số vòng lặp để tạo ra chuỗi mã hóa, có thể chỉ định từ 4-30 vòng
      số vòng lặp càng cao => thời gian tạo chuỗi mã hóa càng lâu
      => độ an toàn càng lớn
     */
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hashPassword,
      isManager: req.body.isManager
    })

    try {
      const newUser = await user.save();
      await response.send(newUser);
    } catch (err) {
      res.status(400).send(err);
    }
  }

  //GET /users/:id
  show(req, res, next) {
    User.findOne({ _id: req.params.id })
      .then(user => mongoose.mongooseToObject(user))
      .catch(next)
  }

  //GET /users/
  index(req, res, next) {
    User.find({})
      .then(users => mongoose.multipleMongooseToObject(users))
      .catch(next)
  }

  //GET /users/edit/:id
  edit(req, res, next) {
    User.findById(req.params.id)
      .then(user => mongoose.mongooseToObject(user))
      .catch(next)
  }

  //PATCH /users/:id
  update(req, res, next) {

  }

  //DELETE /users/:id
  destroy(req, res, next) {}
}

module.exports = new UserController();
