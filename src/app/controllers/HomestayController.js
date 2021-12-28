const Homestay = require('../models/homestay');
const City = require('../models/city');
const Service = require('../models/service');
const Room = require('../models/room');

exports.getAll = async (req, res, next) => {
  try {
    const homestays = await Homestay.find();
    console.log(homestays);
    for (var i = 0; i < homestays.length; i++) {
      await homestays[i]
        .populate({
          path: 'city',
        })
        .execPopulate();
    }
    res.send(homestays);
  } catch (e) {
    res.send(e);
  }
};

exports.getItem = async (req, res, next) => {
  const homestayId = req.params.homestayId;
  const homestay = await Homestay.findById(homestayId);
  const services = await Service.find({ homestay: homestayId });
  res.send({ homestay: homestay, services: services });
};

exports.getCreate = async (req, res, next) => {
  try {
    const cities = await City.find();
    res.send(cities);
  } catch (e) {
    res.send(e);
  }
};

exports.postCreate = async (req, res, next) => {
  console.log(req.body.city);
  const city = await City.findOne({ name: req.body.city });
  const homestay = new Homestay({
    name: req.body.name,
    images: req.body.images,
    address: req.body.address,
    phone: req.body.phone,
    description: req.body.description,
    city: city.id
  });

  homestay
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
}; // res.send("ok")

exports.getListRoomTypes = async (req, res, next) => {
  console.log(req.params.homestayId);
  const h = await Homestay.findOne({ _id: req.params.homestayId });
  console.log(h);
  if (h) {
    const r = await Room.find({})
      .populate({
        path: 'homestay',
        match: { _id: req.params.homestayId },
        select: '_id',
      })
      .exec();
    let result = [];
    for (var i = 0; i < r.length; i++) {
      if (r[i].homestay) {
        result.push(r[i]);
        console.log(111, result);
      }
    }
    console.log(result);
    res.send(result);
  } else res.status(404).send('not found');
};

exports.getAll = (req, res, next) => {
  Homestay.find()
    .then((homestays) => {
      console.log(homestays);
      res.json(homestays);
    })
    .catch((err) => console.log(err));
};

exports.postUpdate = (req, res, next) => {
  const homestayId = req.params.homestayId;
  const data = req.body.data;
  Homestay.findByIdAndUpdate(homestayId, data)
    .then((result) => {
      res.json(data);
    })
    .catch((err) => console.log(err));
};

exports.deleteOne = (req, res, next) => {
  const homestayId = req.params.homestayId;
  Homestay.findByIdAndRemove(homestayId)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => console.log(err));
};

exports.deleteMany = (req, res, next) => {};
