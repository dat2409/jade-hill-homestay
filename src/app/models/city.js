const mongoose = require('mongoose');
const Homestay = require('./homestay')

const Schema = new mongoose.Schema({
    name: {
        type: String
    }
},{timestamps: true});

Schema.virtual('homestays', {
    ref: 'Homestay',
    localField: '_id',
    foreignField: 'city'
})

Schema.methods.toJSON = function() {
    const city = this
    const cityObject = city.toObject()

    delete cityObject.createdAt
    delete cityObject.updatedAt
    return cityObject
}

const  City = mongoose.model('City', Schema);

module.exports = City;