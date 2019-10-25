const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const bcryptjs = require('bcryptjs')

const UserSchema = new Schema({
  username: String,
  password: String,
  email: {
    type: String,
    required: true
  },
  status: Boolean,
  createdAt: Date,
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  ]
})

UserSchema.pre('save', function(next) {
  const salt = bcryptjs.genSaltSync(10);
  this.password = bcryptjs.hashSync(this.password, salt)
  this.createdAt = new Date()
  this.followers = [];
  this.following = [];
  this.status = false;
  next()
})

const User = Mongoose.model('users', UserSchema);

User.createCollection()
  .then(_ => {
    console.log(`User Collection success created!`)
  })
  .catch(console.log);

module.exports = User;