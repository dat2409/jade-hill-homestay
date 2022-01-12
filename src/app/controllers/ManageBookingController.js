const Book = require('../models/book')
const mongoose = require('../../util/mongoose');
const BookItem = require('../models/book_item');
const User = require('../models/user');
const nodemailer = require('nodemailer');

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
    await book.populate({
      path: 'books',
      populate: {
        path: 'room_type',
        populate: {
          path: 'homestay'
        }
      }
    }).execPopulate();
    res.json(mongoose.mongooseToObject(book))
  }

  async deposit(req, res, next) {
    const _id = req.params.bookId;
    const book = await Book.findOneAndUpdate({ _id }, { is_deposited: true })
    await book.populate({
      path: 'books',
      populate: {
        path: 'room_type',
        populate: {
          path: 'homestay'
        }
      }
    }).execPopulate();
    const bookItems = book.books;

    for (var i = 0; i < bookItems.length; i++) {
      await BookItem.findOneAndUpdate({ _id: bookItems[i] }, { status: 1 })
    }

    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: "thaidat2409@gmail.com",
        pass: "dattrong1@"
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    var content = '';
    let checkin = new Date(book.checkin).toLocaleDateString();
    let checkout = new Date(book.checkout).toLocaleDateString();
    content += `
    <div style="padding: 10px; background-color: #003375">
      <div style="padding: 10px; background-color: white;">
        <h1 style="color: blue">JadeHil Homestay Announcement</h1>
        <h2 style="color: green">Bạn đã đặt cọc thành công cho homestay <span style="color: purple">${book.books[0].room_type.homestay.name}</span> wvới các thông tin sau:</h2>
        <ul>
          <h3>
            <li>Họ và tên: ${book.user_info.name}</li>
            <li>Số điện thoại: ${book.user_info.phone}</li>
            <li>Từ ngày: ${checkin}</li>
            <li>Đến ngày: ${checkout}</li>
            <li>Số người: ${book.guests}</li>
            <li>Tổng cộng: ${book.total} ($)</li>
            <li>Đã đặt cọc: ${book.total} ($)</li>
          </h3>
        </ul>
      </div>
    </div>
    `;

    var mainOptions = {
      from: 'SetSail Tour Travel',
      to: 'thaidoandat1@gmail.com',
      subject: 'Thông báo đặt cọc thành công',
      html: content
    }

    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        console.log(err);
      }
      else {
        console.log('Message sent: ' + info.response);
        res.send('ok');
      }
    })
  }

  async checkin(req, res, next) {
    //body {checkin}
    const _id = req.params.bookId;
    const checkin = new Date(req.body.checkin);

    const book = await Book.findById(_id)
    await book.populate({ path: 'books' }).execPopulate();
    const bookItems = book.books;

    for (var i = 0; i < bookItems.length; i++) {
      await BookItem.findOneAndUpdate({ _id: bookItems[i] }, { checkin: checkin, status: 2 })
    }

    res.sendStatus(200)
  }

  async checkout(req, res, next) {
    //body {checkout}
    const _id = req.params.bookId;
    const checkout = new Date(req.body.checkout);

    const book = await Book.findById(_id)
    await book.populate({ path: 'books' }).execPopulate();
    const bookItems = book.books;

    for (var i = 0; i < bookItems.length; i++) {
      await BookItem.findOneAndUpdate({ _id: bookItems[i] }, { checkout: checkout, status: 3 })
    }

    await Book.updateOne({ _id: req.params.bookId }, {
      is_paid: true
    })

    // const roomArr = req.body.room_type;
    // for (var i = 0; i < roomArr; i++) {
    //   const item = bookItems.find(element => element.room_type == roomArr[i])
    //   await BookItem.findOneAndUpdate({ _id : item._id }, { checkin: checkin, status : 2 })
    // }

    res.sendStatus(200)
  }

  deleteOne(req, res, next) {
    Book.deleteOne({ _id: req.params.bookId })
      .then(() => res.send('Delete successfully!'))
  }

  addServices(req, res, next) {
    const data = req.body;
    Book.updateOne({ _id: req.params.bookId }, {
      total: data.total,
      services: data.services
    })
      .then(() => res.send('Add services to bill successfully!'));
  }
}
module.exports = new ManageBookingController();
