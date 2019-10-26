const Msg = require('../models/msg');
const Room = require('../models/room');
const mongoose = require('mongoose');


class MsgController {
  static createAMsg (req,res,next) {
    const { text } = req.body;
    const roomId = req.params.id;
    let msge
    const username = req.loggedUser.username;
    if( text == undefined || username == undefined ) throw {msg: 'empty'}
    else {
      Msg.create({ username, text })
        .then( (msg) => {
          msge = msg
          const MsgId = new mongoose.Types.ObjectId(msg._id)
          return Room.findByIdAndUpdate({ _id: roomId },{ $push: { MsgId } })
        })
        .then( () => {
          res.status(201).json({ msg: msge });
        })
        .catch(next)
    }
  }
  static findthatMsg (req,res,next) {
    const UserId = req.loggedUser.id;
    Msg.find({UserId}).populate('UserId')
      .then(msgs => {
        if(!msgs) throw {msg: 'zero'}
        else{ 
          res.status(200).json(msgs)
        }
      })
      .catch(next)
  }
  static deleteMsgId (req,res,next) {
    const _id = req.params.id;
    if(!_id) throw {msg: 'empty'}
    else {
      Msg.findByIdAndDelete({ _id })
        .then( () => {
          return Room.deleteMany({ MsgId: _id })
        })
        .then( () => {
          res.status(200).json({msg: 'success delete Msg'})
        })
        .catch(next)
    }
  }
}



module.exports = MsgController;