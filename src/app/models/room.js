const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    bed_quantity: {
        type: Number,
        required: true
    },
    homestay: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homestay'
    },
    room_num: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});



const Room = mongoose.model('Room', Schema);

module.exports = Room;