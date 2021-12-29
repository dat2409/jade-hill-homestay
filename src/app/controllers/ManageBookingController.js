const Book = require('../models/book')
const mongoose = require('../../util/mongoose');
const BookItem = require('../models/book_item');

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

  async deposit(req, res, next) {
    const _id = req.body.book_id;
    const book = await Book.findOneAndUpdate({ _id }, { is_deposited: true })
    await book.populate({path: 'books'}).execPopulate();
    const bookItems = book.books;

    for (var i = 0; i < bookItems.length; i++) {
      await BookItem.findOneAndUpdate({ _id : bookItems[i] }, { status : 1 })
    }

    res.send(200)
  }

  async checkin(req, res, next) {
    //body {book_id, room_type[], checkin}
    const _id = req.body.book_id;
    const roomArr = req.body.room_type;
    const checkin = new Date(req.body.checkin);

    const book = await Book.findById(_id)
    await book.populate({path: 'books'}).execPopulate();
    const bookItems = book.books;

    for (var i = 0; i < roomArr; i++) {
      const item = bookItems.find(element => element.room_type == roomArr[i])
      await BookItem.findOneAndUpdate({ _id : item._id }, { checkin: checkin, status : 2 })
    }

    res.send(200)
  }

  async checkout(req, res, next) {
    //body {book_id, room_type[], checkout}
    const _id = req.body.book_id;
    const roomArr = req.body.room_type;
    const checkout = new Date(req.body.checkout);

    const book = await Book.findById(_id)
    await book.populate({path: 'books'}).execPopulate();
    const bookItems = book.books;

    for (var i = 0; i < roomArr; i++) {
      const item = bookItems.find(element => element.room_type == roomArr[i])
      await BookItem.findOneAndUpdate({ _id : item._id }, { checkout: checkout, status : 3 })
    }

    res.send(200)
  }

  deleteOne(req, res, next) {
    Book.deleteOne({ _id: req.params.bookId })
      .then(() => res.send('Delete successfully!'))
  }
}
module.exports = new ManageBookingController();
