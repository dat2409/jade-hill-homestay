const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    room_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
    },
    
    total_rooms: {
        type: Number,
        required: true,
    },

    time_booked: [{
        day: {
            type: Date,
            required: true,
        },
        volume: {
            type: Number,
            required: true,
            default: 0,
        }
    }]
})