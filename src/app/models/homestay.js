const mongoose = require('mongoose');

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'City',
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Homestay = mongoose.model('Homestay', Schema);

module.exports = Homestay;
