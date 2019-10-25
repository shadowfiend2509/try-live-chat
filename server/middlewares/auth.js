const { decodeToken } = require('../helpers/jwt');
const User = require('../models/user');

function authentication (req,res,next) {
  try{
    if(req.headers.token){
      let user = decodeToken(req.headers.token);
      if(user) {
        req.loggedUser = user
        next()
      } else {
        throw {msg: 'token'}
      }
    }else {
      throw {msg: 'authen'}
    }
  }
  catch (err) {
    next(err)
  }
}

module.exports = {
  authentication
}