const BookItem = require('../models/book_item');
const Book = require('../models/book')

class BookingController {
    async create(req, res, next) {
        const { user_info, books } = req.body.data;
        const bookArr = [];
        for (var i=0; i<books.length; i++) {
            const bookItem = new BookItem({
                room_type: books[i].room_type,
                checkin: books[i].checkin,
                checkout: books[i].checkout,
                persons: books[i].persons
            });
            await bookItem.save()
            console.log('item',bookItem)
            bookArr.push(bookItem._id)
        }
        console.log(bookArr)
        const book = new Book({
            user_info: user_info,
            books: bookArr
        })
        await book.save()
        res.json(book)
    }
}
module.exports = new BookingController();