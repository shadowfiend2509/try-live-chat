const User = require('../models/user');
const { comparePassword } = require("../helpers/hash");
const { signToken } = require('../helpers/jwt')

class UserController {
  static ceklogin (req,res,next) {
    User.findById({ _id: req.loggedUser.id })
      .then(user => {
        res.status(200).json(user);
      })
      .catch(next)
  }
  static login (req,res,next) {
    let tempUser
    const {email, password} = req.body;
    if(email ==undefined, password ==undefined) throw {msg: 'zero'}
    else {
      User.findOne({ email })
        .then(user => {
          tempUser = user;
          if(user && comparePassword(password, user.password)) {
            return User.findByIdAndUpdate({_id: user._id},{status: true})
          } else {
            throw {msg: 'user/pass'}
          }
        })
        .then(_ => {
          const payload = {
            id: tempUser._id,
            username: tempUser.username,
            email: tempUser.email
          }
          const serverToken = signToken(payload)
          res.status(200).json({token: serverToken, msg: 'Online', user: payload})
        })
        .catch(next)
    }
  }
  static register (req,res,next) {
    console.log(req.body)
    const {username, email, password} = req.body;
    if(username == undefined || email == undefined || password == undefined) throw {msg: 'zero'}
    else {
      User.create({username, email, password})
        .then(user => {
          console.log(user)
          res.status(201).json({msg: 'Success Register!'})
        })
        .catch(next)
    }
  }
}

module.exports = UserController;