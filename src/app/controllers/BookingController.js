const BookItem = require('../models/book_item');
const Book = require('../models/book')

class BookingController {
  async create(req, res, next) {
    const { user_info, guests, checkin, checkout, books, total } = req.body;
    const bookArr = [];
    for (var i = 0; i < books.length; i++) {
      const bookItem = new BookItem({
        room_type: books[i].room_type,
        book_from: checkin,
        book_to: checkout,
        checkin: checkin,
        checkout: checkout,
        volume: books[i].volume,
        status: 0
      });
      await bookItem.save()
      console.log('item', bookItem)
      bookArr.push(bookItem._id)
    }
    console.log(bookArr)
    const book = new Book({
      user_info: user_info,
      guests: guests,
      checkin: checkin,
      checkout: checkout,
      total: total,
      books: bookArr
    })
    await book.save()
    res.json(book)
  }

  // async create(req, res, next) {
  //   const { user_info, books } = req.body;
  //   const bookArr = [];
  //   for (var i = 0; i < books.length; i++) {
  //     const bookItem = new BookItem({
  //       room_type: books[i].room_type,
  //       book_from: books[i].book_from,
  //       book_to: books[i].book_to,
  //       persons: books[i].persons,
  //       volume: books[i].volume
  //     });
  //     await bookItem.save()
  //     console.log('item', bookItem)
  //     bookArr.push(bookItem._id)
  //   }
  //   console.log(bookArr)
  //   const book = new Book({
  //     user_info: user_info,
  //     books: bookArr
  //   })
  //   await book.save()
  //   res.json(book)
  // }
}
module.exports = new BookingController();
