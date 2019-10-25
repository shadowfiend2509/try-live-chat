const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const MsgSchema = new Schema({
  UserId: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  text: {
    type: String,
    required: true
  },
  createdAt: String
})

MsgSchema.pre('save', function(next) {
  const time = new Date;
  this.createdAt = time.toLocaleString();
  next();
})

const Msg = Mongoose.model('messages', MsgSchema);

Msg.createCollection()
  .then(_ => {
    console.log(`Msg Collection Created!`)
  })
  .catch(console.log)

module.exports = Msg;