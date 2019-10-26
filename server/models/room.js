const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const RoomSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  UserId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  MsgId: [
    {
      type: Schema.Types.ObjectId,
      ref: 'messages'
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  createdAt: String
})

RoomSchema.pre('save', function(next) {
  if(this.UserId.length < 5) {
    this.MsgId = [];
    const time = new Date();
    this.createdAt =time.toLocaleString();
    next()
  } else {
    throw {msg: 'limit'}
  }
})

const Room = Mongoose.model('rooms', RoomSchema);

Room.createCollection()
  .then(_ => {
    console.log(`Room Collection Created!`)
  })
  .catch(console.log)

module.exports = Room;