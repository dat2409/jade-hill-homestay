const Book = require('../models/book');
const BookItem = require('../models/book_item');
const Schedule = require('../models/schedule');
/**
 * Thêm 1 trường quantity vào bảng room
 *
 * 1. Khi click vào đã Đặt cọc, thì chuyển is_deposited trong object book
 * thành true
 * 2. Lấy ra các item trong mảng books, từ đó lấy book_from, book_to, room_type,
 * quantity lưu vào schedule
 */
class ScheduleController {
  async create(req, res, next) {
    const _id = req.body._id;
    const books = req.body.books;

    Book.findOneAndUpdate({ _id }, { is_deposited: true })
      .then(book => console.log(book));

    await books.populate('books');
    // const timeBooked = []
    for (var i = 0; i < books.length; i++) {
      const schedule = new Schedule({
        room_type: books[i].room_type,
        quantity: books[i].quantity,
      })
    }

  }

  update(req, res, next) {
    const _id = req.body._id;
    const books = req.body.books;

    Book.findOneAndUpdate({ _id }, { is_deposited: true })
      .then(book => console.log(book));

      for (var i = 0; i < books.length; i++) {
        Schedule.findOneAndUpdate(
          { room_type: books[i].room_type },
          {  }
          )
      }
  }
}
module.exports = new ScheduleController();
