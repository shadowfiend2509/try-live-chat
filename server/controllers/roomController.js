const Room = require('../models/room');
const mongoose = require('mongoose');

class RoomController {
  static findAllRoom (req,res,next) {
    Room.find()
      .then(rooms => {
        res.status(200).json(rooms)
      })
      .catch(next)
  }
  static createRoom (req,res,next) {
    const UserId = req.loggedUser.id;
    const { title } = req.body;
    Room.create({ UserId, title })
      .then(_ => {
        res.status(201).json({msg: 'room created!'})
      })
      .catch(next)
  }
  static getRoom (req,res,next) {
    const _id = req.params.id;
    Room.findById({ _id }).populate('MsgId').populate('UserId')
      .then(room => {
        if(!room) throw {msg: 'zero'}
        else {
          res.status(200).json(room)
        }
      })
      .catch(next)
  }
  static joinRoom (req,res,next) {
    const _id = req.params.id;
    const UserId = new mongoose.Types.ObjectId(req.loggedUser.id);
    Room.findByIdAndUpdate({ _id },{ $push: { UserId }})
      .then( (r) => {
        if(!r) throw {msg: 'zerp'}
        else {
          res.status(200).json({ msg: 'success joining Room' })
        }
      })
      .catch(next)
  }

  static deleteRoom (req,res,next) {
    const _id = req.params.id;
    Room.deleteOne({ _id })
      .then( () => {
        res.status(200).json({msg: 'Deleted!'});
      })
      .catch(next)
  }
}

module.exports = RoomController;