const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    user_info: {
      name: {
        type: String,
      },
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
      sex: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
      },
    },
    guests: {
      type: Number,
      required: true,
    },
    book_from: {
      type: Date,
      required: true,
    },
    book_to: {
      type: Date,
      required: true,
    },
    checkin: {
      type: Date,
      required: true,
    },
    checkout: {
      type: Date,
      required: true,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookItem',
      },
    ],
    homestay: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homestay',
      },
    ],
    is_deposited: {
      type: Boolean,
      default: false,
    },
    is_paid: {
      type: Boolean,
      default: false,
    },
    services: [
      {
        service: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Service',
        },
        volume: {
          type: Number,
          require: true,
        },
      },
    ],
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      enum: [0, 1, 2, 3], //0-unpaid 1-paid 2-checkedin 3-checkedout
      default: 0,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model('Book', Schema);

module.exports = Book;
