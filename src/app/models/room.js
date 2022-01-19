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
      // required: true,
    },
    total_rooms: {
      type: Number,
      required: true
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
    image: {
      type: Buffer
    }
  },
  {
    timestamps: true,
  }
);

Schema.methods.toJSON = function() {
  const room = this
  const roomObject = room.toObject()

  delete roomObject.image
  return roomObject
}

const Room = mongoose.model('Room', Schema);

module.exports = Room;
