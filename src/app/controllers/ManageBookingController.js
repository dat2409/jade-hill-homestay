const Book = require('../models/book')

class ManageBookingController {
    async getAll(req, res, next) {
        const bookArr = await Book.find();
        for (var i=0; i<bookArr.length; i++) {
            console.log('bookTo', bookArr[i]);
            await bookArr[i].populate({path: 'books'}).execPopulate();
            console.log(bookArr[i].books);
        }
        res.json(bookArr);
    }

    getItem(req, res, next) {

    }

    deleteOne(req, res, next) {

    }
}
module.exports = new ManageBookingController();