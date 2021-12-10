const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    room_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    },
    checkin: {
        type: Date,
        required: true
    },
    checkout: {
        type: Date,
        required: true
    },
    persons: {
        type: Number
    },

},{timestamps: true});

const  BookItem = mongoose.model('BookItem', Schema);

module.exports = BookItem;