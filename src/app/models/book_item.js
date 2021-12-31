const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    room_type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
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
    persons: {
      type: Number,
    },
    volume: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BookItem = mongoose.model('BookItem', Schema);

module.exports = BookItem;
