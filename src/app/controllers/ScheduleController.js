const Book = require('../models/book');
const BookItem = require('../models/book_item');
const Schedule = require('../models/schedule');
const Room = require('../models/room');
/**
 * Thêm 1 trường quantity vào bảng room
 *
 * 1. Khi click vào đã Đặt cọc, thì chuyển is_deposited trong object book
 * thành true
 * 2. Lấy ra các item trong mảng books, từ đó lấy book_from, book_to, room_type,
 * quantity lưu vào schedule
 */
class ScheduleController {
  async deposit(req, res, next) {
    const _id = req.body.book_id;
    const book = await Book.findOneAndUpdate({ _id }, { is_deposited: true })
    await book.populate({path: 'books'}).execPopulate();
    const books = book.books;

    for (var i = 0; i < books.length; i++) {
      var schedule = await Schedule.findOne({ room_type: books[i].room_type });
      if (!schedule) {
        const room = await Room.findById(books[i].room_type)
        schedule = new Schedule({
          room_type: room._id,
          total_rooms: room.total_rooms,
          time_booked: []
        })
        await schedule.save();
      }

      const time_booked = schedule.time_booked;
      for (var j=books[i].checkin; j<=books[i].checkout; j.setDate(j.getDate() + 1)) {
        console.log('date', j);
        const index = await time_booked.findIndex(element => element.day.getTime() == j.getTime());
        if (index > -1) {
          time_booked[index].volume += books[i].volume
        } else {
          const day = new Date(j)
          time_booked.push({ day: day, volume: books[i].volume })
        }
      }
      console.log(time_booked)
      await schedule.updateOne({ time_booked })
    }

    res.send('OK');
  }
}
module.exports = new ScheduleController();
