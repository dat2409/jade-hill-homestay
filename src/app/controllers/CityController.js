const City = require('../models/city');
const mongoose = require('../../util/mongoose');
const Homestay = require('../models/homestay');

class CityController {
  //GET /cities/new
  create(req, res, next) {
    res.send('create city');
  }

  //POST /cities/create
  async postCreate(req, res, next) {
    const city = new City({
        ...req.body
    })
    city.save()
    res.send(city)
  }

  async delete(req, res, next) {
    const city = await City.findByIdAndDelete({_id: req.params.id})
    const homestays = await Homestay.find({city: req.params.id})
    for (var i = 0; i < homestays.length; i++){
      await Homestay.findByIdAndDelete({_id: homestays[i]._id})
    }
    console.log(homestays)
    res.send("delete successfully")
  }

  async getCity(req, res, next) {
    const city = await City.findById(req.params.id)
    await city.populate(
      'homestays'
    ).execPopulate()
    console.log(city)
    res.send(city)
  }

  async getUpdate(req, res, next) {
    const city = await City.findById(req.params.id)
    res.send(city)
  }

  async postUpdate(req, res, next) {
    const updates = Object.keys(req.body)
    const city = await City.findById(req.params.id)
    try {
        updates.forEach((update) => city[update] = req.body[update])
        await city.save()
        res.send(city)
    } catch (e) {
        res.status(400).send(e)
    }
  }

  async all(req, res, next) {
    City.find()
        .then(cities => {
            console.log(cities);
            res.json(cities)
        })
        .catch(err => console.log(err));
  }
}

module.exports = new CityController();