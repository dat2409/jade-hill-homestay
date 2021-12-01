const Homestay = require('../models/homestay');
const City = require('../models/city');
const Service = require('../models/service');

exports.getAll = async (req, res, next) => {
    try{
        const homestays = await Homestay.find()
        for (var i = 0; i < homestays.length; i++){
            await homestays[i].populate({
                path:'city'
            }).execPopulate()
        }
        res.send(homestays)
    } catch (e) {
        res.send(e)
    }
};

exports.getItem = async (req, res, next) => {
    const homestayId = req.params.homestayId;
    const homestay = await Homestay.findById(homestayId)
    const services = await Service.find({homestay: homestayId})
    res.send({homestay: homestay, services: services})
  };

exports.getCreate = async (req, res, next) => {
    try{
        const cities = await City.find()
        res.send(cities)
    } catch (e) {
        res.send(e)
    }
};

exports.postCreate = async (req, res, next) => {
    console.log(req.body.city)
    const city = await City.findOne({name: req.body.city})
    const homestay = new Homestay({
        name: req.body.name,
        images: req.body.images,
        address: req.body.address,
        phone: req.body.phone,
        description: req.body.description
    })
    homestay.city = city._id
    homestay.save()
        .then(result => {
            res.json(result) ;
        })
        .catch(err => {
            console.log(err);
        });
    // res.send("ok")
};

exports.postUpdate = (req, res, next) => {
    const homestayId = req.params.homestayId;
    const data = req.body.data;
    Homestay.findByIdAndUpdate(homestayId, data)
        .then(result => {
            res.json(data);
        })
        .catch(err => console.log(err));
};

exports.deleteOne = (req, res, next) => {
  const homestayId = req.params.homestayId;
  Homestay.findByIdAndRemove(homestayId)
    .then(() => {
        res.sendStatus(200);
    })
    .catch(err => console.log(err));
};

exports.deleteMany = (req, res, next) => {}