const Homestay = require('../models/homestay');
const City = require('../models/city');
const Service = require('../models/service');
const Room = require('../models/room');
const BookItem = require('../models/book_item');
const Book = require('../models/book');
const { count } = require('../models/homestay');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

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
          $match: {
            homestayId: req.params.homestayId,
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

exports.getOneStatistic = async (req, res, next) => {
  if (req.query.year) {
    var year = parseInt(req.query.year);
    if (req.query.feature == 'money') {
      filterBy = '$total';
    } else if (req.query.feature == 'guests') {
      filterBy = '$guests';
    }
    //month
    if (req.query.type == 'month') {
      var list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      var total = 0;
      var max = 0;
      const moneyBooking = await Book.aggregate([
        {
          $match: {
            homestayId: ObjectId(req.params.id),
            status: 3,
            $expr: { $eq: [{ $year: '$checkout' }, year] },
          },
        },
        {
          $group: {
            _id: {
              month: { $month: '$checkout' },
              year: { $year: '$checkout' },
            },
            total: { $sum: filterBy },
          },
        },
      ]);
      for (var i = 0; i < moneyBooking.length; i++) {
        list[moneyBooking[i]._id.month - 1] = moneyBooking[i].total;
        total += moneyBooking[i].total;
        if (moneyBooking[i].total > max) {
          max = moneyBooking[i].total;
        }
      }
      res.status(200).send({ list, total, max });
    } else if (req.query.type == 'quarter') {
      //quarter
      const quarters = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [10, 11, 12],
      ];
      var list = [0, 0, 0, 0];
      var total = 0;
      var max = 0;
      for (var j = 0; j < 4; j++) {
        for (var i = 0; i <= 3; i++) {
          var moneyBooking = await Book.aggregate([
            {
              $match: {
                homestayId: ObjectId(req.params.id),
                status: 3,
                $expr: {
                  $and: [
                    {
                      $eq: [
                        {
                          $month: '$checkout',
                        },
                        quarters[j][i],
                      ],
                    },
                    {
                      $eq: [
                        {
                          $year: '$checkout',
                        },
                        year,
                      ],
                    },
                  ],
                },
              },
            },
            {
              $group: {
                _id: {
                  month: { $month: '$checkout' },
                  year: { $year: '$checkout' },
                },
                total: { $sum: filterBy },
              },
            },
          ]);
          if (moneyBooking.length != 0) {
            list[j] += moneyBooking[0].total;
            total += moneyBooking[0].total;
          }
        }
        if (list[j] > max) {
          max = list[j];
        }
      }

      res.status(200).send({ list, total, max });
    }
  } else {
    var totalMoney = 0;
    var countBooking = 0;
    var totalGuests = 0;
    const moneyBooking = await Book.aggregate([
      {
        $match: {
          homestayId: ObjectId(req.params.id),
          status: 3,
        },
      },
      {
        $group: {
          _id: { id: '$homestayId' },
          total: { $sum: '$total' },
          totalGuests: {$sum: '$guests'}
        },
      },
    ]);
    if (moneyBooking.length != 0) {
      totalMoney = moneyBooking[0].total;
      totalGuests = moneyBooking[0].totalGuests
    }
    const numberBooking = await Book.aggregate([
      {
        $match: {
          homestayId: ObjectId(req.params.id),
          status: 3,
        },
      },
      {
        $count: 'booking',
      },
    ]);
    if (numberBooking.length != 0) {
      countBooking = numberBooking[0].booking;
    }
    res.status(200).send({ totalMoney, countBooking, totalGuests });
  }
};

exports.deleteMany = (req, res, next) => {};
