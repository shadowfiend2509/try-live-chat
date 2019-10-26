const Route = require('express').Router();
const MsgCont = require('../controllers/msgController.js');
const { authentication } = require('../middlewares/auth');

Route.get(
  '/', 
  authentication, 
  MsgCont.findthatMsg
);  //==> this is id User

Route.post(
  '/post/:id', // post a message with RoomId in params 
  authentication, 
  MsgCont.createAMsg
); 

Route.delete(
  '/:id', // Delete Msg Id <== deleteMany in room, MsgId
  authentication,
  MsgCont.deleteMsgId
)

module.exports = Route;