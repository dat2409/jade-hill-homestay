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
      email: req.body.email,
      password: hashPassword,
      role: req.body.role,
      created_by: `${req.user.last_name} ${req.user.first_name}`,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone_num: req.body.phone_num
    })

    try {
      const newUser = await user.save();
      await res.send(newUser);
    } catch (err) {
      console.log("err: ", err)
      res.status(400).send(err);
    }
  }

  //GET /users/:id
  show(req, res, next) {
    User.findOne({ _id: req.params.id })
      .then(user => res.json(mongoose.mongooseToObject(user)))
      .catch(next)
  }

  //GET /users/
  index(req, res, next) {
    User.find({})
      .then(users => res.json(mongoose.multipleMongooseToObject(users)))
      .catch(next)
  }

  //GET /users/edit/:id
  edit(req, res, next) {
    User.findById(req.params.id)
      .then(user => res.json(mongoose.mongooseToObject(user)))
      .catch(next)
  }

  //PATCH /users/:id
  update(req, res, next) {
    const { error } = createUserValidator(req.body);

    if (error) return res.status(422).send(error.details[0].message);

    User.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.send('Update successfully!'))
  }

  async updatePassword(req, res, next) {
    const salt = await bcrypt.genSalt(10);
    const hashNewPassword = await bcrypt.hash(req.body.password, salt);

    User.updateOne({ _id: req.params.id }, {
      password: hashNewPassword
    })
      .then(() => res.send('Change password successfully!'));
  }

  profile(req, res, next) {
    res.send(req.user);
  }

  //DELETE /users/:id
  async destroy(req, res, next) {
    await User.deleteOne({ _id: req.params.id })
      .then(() => res.send('Delete successfully!'))
  }
}

module.exports = new UserController();
