const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    name: {
        type: String
    }
},{timestamps: true});

const  City = mongoose.model('City', Schema);

module.exports = City;