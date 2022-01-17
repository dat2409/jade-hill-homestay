const BookItem = require('../models/book_item');
const Book = require('../models/book');
const nodemailer = require('nodemailer');

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
        status: 0,
      });
      await bookItem.save();
      console.log('item', bookItem);
      bookArr.push(bookItem._id);
    }
    console.log(bookArr);
    const book = new Book({
      user_info: user_info,
      guests: guests,
      book_from: checkin,
      book_to: checkout,
      checkin: checkin,
      checkout: checkout,
      total: total,
      books: bookArr,
    });
    await book
      .populate({
        path: 'books',
        populate: {
          path: 'room_type',
          populate: {
            path: 'homestay',
          },
        },
      })
      .execPopulate();
    book.homestayId = book.books[0].room_type.homestay._id;
    await book.save();
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'thaidat2409@gmail.com',
        pass: 'dattrong1@',
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var content = '';
    let newCheckin = new Date(book.checkin).toLocaleDateString();
    let newCheckout = new Date(book.checkout).toLocaleDateString();
    content += `
    <div style="padding: 10px; background-color: #003375">
      <div style="padding: 10px; background-color: white;">
        <h1 style="color: blue">JadeHil Homestay Announcement</h1>
        <h2 style="color: green">Bạn đã đặt thành công homestay <span style="color: purple">${book.books[0].room_type.homestay.name}</span> với các thông tin sau:</h2>
        <ul>
          <h3>
            <li>Họ và tên: ${book.user_info.name}</li>
            <li>Số điện thoại: ${book.user_info.phone}</li>
            <li>Từ ngày: ${newCheckin}</li>
            <li>Đến ngày: ${newCheckout}</li>
            <li>Số người: ${book.guests}</li>
            <li>Tổng tiền: ${book.total} (đồng)</li>
            <li>Tổng tiền phải đặt cọc: ${book.total} (đồng)</li>
          </h3>
        </ul>
        <h2>Vui lòng thanh toán tiền phòng theo thông tin sau đây</h2>
          <ul>
            <h3>
              <li>Chủ tài khoản: THAI DOAN DAT</li>
              <li>Số tài khoản: 12910000144428</li>
              <li>Ngân hàng: BIDV</li>
            </h3>
          </ul>
        <h3 style="color: red">Lưu ý: nếu không hoàn thành việc thanh toán, đơn của bạn sẽ bị hủy.</h3>
      </div>
    </div>
    `;

    var mainOptions = {
      from: 'JadeHill Homestay',
      to: book.user_info.email,
      subject: 'Xác nhận thông tin đặt homestay',
      html: content,
    };

    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log('Message sent: ' + info.response);
        res.send('ok');
      }
    });
    res.json(book);
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
