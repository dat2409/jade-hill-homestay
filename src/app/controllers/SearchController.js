const Service = require('../models/service');
const mongoose = require('../../util/mongoose');
const Homestay = require('../models/homestay');
const City = require('../models/city');

class SearchController {
  async getAllCities(req, res, next) {
    City.find()
        .then(cities => {
            console.log(cities);
            res.json(cities)
        })
        .catch(err => console.log(err));
  }

  async search(req, res, next) {
    // const city = await City.findOne({name: req.query.cityid})
    const homestays = await Homestay.find({city: req.query.cityid})
    res.status(200).send(homestays)
  }
}

module.exports = new SearchController();
