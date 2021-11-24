const Homestay = require('../models/homestay');

exports.getAll = (req, res, next) => {
    Homestay.find()
        .then(homestays => {
            console.log(homestays);
            res.json(homestays)
        })
        .catch(err => console.log(err));
};

exports.getItem = (req, res, next) => {
    const homestayId = req.params.homestayId;
    Homestay.findById(homestayId)
        .then(homestay => {
            if (homestay) {
                res.json(homestay);
            }
        })
        .catch(err => console.log(err));
  };

exports.postCreate = (req, res, next) => {
    // const name = req.body.name;
    // const images = req.body.images;
    // const city = req.body.city;
    // const address = req.body.address;
    // const phone = req.body.phone;
    // const description = req.body.description;

    // const homestay = new Homestay(
    //     {name,
    //     images,
    //     city,
    //     address,
    //     description,
    //     phone}
    // );
    const data = req.body.data;
    const homestay = new Homestay(data);

    homestay.save()
        .then(result => {
            res.json(result) ;
        })
        .catch(err => {
            console.log(err);
        });
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