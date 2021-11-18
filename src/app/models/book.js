const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String
    },
    is_paid: {
        type: Number
    }

},{timestamps: true});

const  Book = mongoose.model('Book', Schema);

module.exports = Book;