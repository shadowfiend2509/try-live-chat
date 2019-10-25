module.exports = (err,req,res,next) => {
  console.log(err)
  if(err.msg == 'user/pass') {
    res.status(403).json({msg: 'username/password wrong!'});
  }else if(err.msg == 'zero') {
    res.status(403).json({msg: 'invalid input'});
  }else if(err.msg == 'ValidationError') {
    res.status(403).json({msg: 'Validation Error'});
  }else if(err.msg == 'token') {
    res.status(403).json({msg: 'Invalid Token'});
  }else if(err.msg == 'authen') {
    res.status(403).json({msg: 'Authentication Error!'});
  }else if(err.msg == 'author') {
    res.status(403).json({msg: 'Authorization Error!'});
  }else if(err.msg == 'empty') {
    res.status(403).json({msg: 'Cannot Empty!'});
  }else if(err.msg == 'zero' ) {
    res.status(404).json({msg: 'Not Found!'})
  }
  else {
    res.status(500).json({msg: 'Internal Server Error'})
  }
}