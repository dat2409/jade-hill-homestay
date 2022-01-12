const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    user_info: {
        name: {
            type: String
        },
        phone: {
            type: String
        },
        email: {
            type: String
        },
        sex: {
            type: String,
            enum: ['Male', 'Female', 'Other']
        }
    },
    guests: {
        type: Number,
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
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookItem'
    }],
    is_deposited: {
        type: Boolean,
        default: false,
    },
    is_paid: {
      type: Boolean,
      default: false,
  },
    services: [{
      service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service'
      },
      volume: {
        type: Number,
        require: true
      }
    }],
    total: {
        type: Number,
        required: true,
    }
},{timestamps: true});

const  Book = mongoose.model('Book', Schema);

module.exports = Book;
