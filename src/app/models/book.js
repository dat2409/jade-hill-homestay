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
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BookItem'
    }],
    is_deposited: {
        type: Boolean,
        default: false,
    }

},{timestamps: true});

const  Book = mongoose.model('Book', Schema);

module.exports = Book;