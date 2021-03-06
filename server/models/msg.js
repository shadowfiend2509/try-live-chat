const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const MsgSchema = new Schema({
  username: {
    type: String,
    required: true
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