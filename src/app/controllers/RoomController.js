const Room = require('../models/room');
const Homestay = require('../models/homestay');
const User = require('../models/user');

class RoomController {
  async createRoom(req, res, next) {
    let h;
    console.log(1);
    try {
      h = await Homestay.findOne({ _id: req.body.homestayId });
      console.log(2);
    } catch (e) {
      res.status(404).send('not found homestay');
      return;
    }
    const r = await Room.find({ name: req.body.name })
      .populate({
        path: 'homestay',
        match: { _id: req.body.homestayId },
        select: '_id',
      })
      .exec();
    if (r.length > 0) {
      for (var i = 0; i < r.length; i++) {
        if (!!r[i].homestay) {
          res.status(409).send('conflig');
          return;
        }
      }
    }

    const u = await User.findOne({ _id: req.user._id });
    req.body.creator = u;
    req.body.homestay = h;
    delete req.body.homestayId;
    const room = new Room(req.body);
    await room.save();
    res.send(room);
  }
  async updateRoomType(req, res, next) {
    let r = await Room.findOne({ _id: req.params.id })
      .populate({ path: 'homestay', select: '_id' })
      .exec();
    if (r) {
      let h;
      try {
        h = await Homestay.findOne({ _id: req.body.homestayId });
      } catch (e) {
        res.status(404).send('not found homestay');
        return;
      }
      console.log(!h);
      // if (!h) {
      //   res.status(404).send('not found homestay');

      //   return;
      // }
      req.body.homestay = h;
      if (r.name !== req.body.name) {
        const rooms = await Room.find({ name: req.body.name })
          .populate({
            path: 'homestay',
            match: { _id: req.body.homestayId },
            select: '_id',
          })
          .exec();
        if (rooms.length > 0) {
          for (var i = 0; i < rooms.length; i++) {
            if (!!rooms[i].homestay) {
              res.status(409).send('conflig');
              return;
            }
          }
        }
      }
      Room.findByIdAndUpdate({ _id: r._id }, req.body, { new: true }).then(
        (n) => {
          console.log(2222);
          res.send(n);
        }
      );
    } else res.status(404).send('not found');
  }
  deleteRoomType(req, res, next) {
    Room.findOneAndDelete({ _id: req.params.id }).then((result) => {
      if (result) res.send('deleted');
      else res.status(404).send('not found');
    });
  }
}
module.exports = new RoomController();
