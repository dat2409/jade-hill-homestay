const Book = require('../models/book')
const mongoose = require('../../util/mongoose');

class ManageBookingController {
  async getAll(req, res, next) {
    const bookArr = await Book.find();
    for (var i = 0; i < bookArr.length; i++) {
      console.log('bookTo', bookArr[i]);
      await bookArr[i].populate({ path: 'books' }).execPopulate();
      console.log(bookArr[i].books);
    }
    res.json(bookArr);
  }

  async getItem(req, res, next) {
    const book = await Book.findOne({ _id: req.params.bookId })
    await book.populate({ path: 'books' }).execPopulate();
    res.json(mongoose.mongooseToObject(book))
  }

  deleteOne(req, res, next) {
    Book.deleteOne({ _id: req.params.bookId })
      .then(() => res.send('Delete successfully!'))
  }
}
module.exports = new ManageBookingController();
