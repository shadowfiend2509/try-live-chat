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
    const MsgId = req.params.id;
    const RoomId = req.body.id;
    console.log(req.params.id)
    console.log(req.body.id)
    if(!MsgId) throw {msg: 'empty'}
    else {
      Room.findById({ _id: RoomId })
        .then(room => {
          room.MsgId.forEach((el, i) => {
            if(el == MsgId){
              room.MsgId.splice(i, 1)
            }
          })
          return Room.findByIdAndUpdate({ _id: RoomId }, { MsgId: room.MsgId })
        })
        .then( () => {
          return Msg.findByIdAndDelete({ _id: MsgId })
        })
        .then( () => {
          return Room.deleteMany({ MsgId })
        })
        .then( () => {
          res.status(200).json({msg: 'success delete Msg'})
        })
        .catch(next)
    }
  }
}



module.exports = MsgController;