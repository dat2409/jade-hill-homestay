const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    single_bed: {
      type: Number,
      required: true,
    },
    multi_bed: {
      type: Number,
      required: true,
    },
    min_people: {
      type: Number,
      required: true,
    },
    max_people: {
      type: Number,
      required: true,
    },
    homestay: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Homestay',
    },
    room_nums: {
      type: [Number],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model('Room', Schema);

module.exports = Room;
