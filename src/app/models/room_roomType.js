const { number } = require('joi');
const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    number: { type: Number, require: true },
    roomType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
    },
  },
  {
    timestamps: true,
  }
);

const RoomNumber = mongoose.model('roomNumber', Schema);

module.exports = RoomNumber;
