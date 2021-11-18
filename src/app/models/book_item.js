const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book'
    },
    checkin: {
        type: Date,
        required: true
    },
    checkout: {
        type: Date,
        required: true
    },
    num_of_guest: {
        type: Number
    }

},{timestamps: true});

const  BookItem = mongoose.model('BookItem', Schema);

module.exports = BookItem;