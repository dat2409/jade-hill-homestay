const Homestay = require('../models/homestay');
const City = require('../models/city');
const Service = require('../models/service');
const Room = require('../models/room');
const BookItem = require('../models/book_item');
const Book = require('../models/book');
const { count } = require('../models/homestay');

exports.getAll = async (req, res, next) => {
  try {
    const homestays = await Homestay.find();

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
    city: city.id,
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
  const h = await Homestay.findOne({ _id: req.params.homestayId });

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
exports.getListRoomTypesFilter = async (req, res, next) => {
  const h = await Homestay.findOne({ _id: req.params.homestayId });
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
        result.push(r[i].toObject());
      }
    }
    let start = new Date(req.query.start * 1000);
    start.setHours(start.getHours() + 7);
    let end = new Date(req.query.end * 1000);
    end.setHours(end.getHours() + 7);
    for (var i = 0; i < result.length; i++) {
      let count = await BookItem.countDocuments({
        $and: [
          { book_to: { $gte: start } },
          { book_from: { $not: { $gte: end } } },
          { status: { $in: [1, 2] } },
        ],
      });
      console.log(111, count);

      result[i]['total_rooms'] = result[i]['room_nums'].length;
      result[i]['total'] = Number(result[i]['total_rooms']) - Number(count);
    }
    res.send(result);
    return;
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
exports.getCountVisit = (req, res, next) => {
  try {
    Book.aggregate(
      [
        // { $match: { status: { $in: [1, 2, 3] } } },
        {
          $lookup: {
            from: 'Homestay',
            localField: '_id',
            foreignField: '_id',
            as: 'Homestay',
          },
        },
        {
          $match: {
            'Homestay.id': req.params.homestayId,
            status: { $in: [1, 2, 3] },
          },
        },
        {
          $group: {
            _id: '',
            guests: { $sum: '$guests' },
          },
        },
        {
          $project: {
            _id: 0,
            guests: '$guests',
          },
        },
      ],
      function (err, result) {
        console.log(111, result);
        res.send(result);
      }
    );
  } catch (e) {
    console.log(e);
  }
};

exports.deleteMany = (req, res, next) => {};
