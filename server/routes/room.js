const Route = require('express').Router();
const RoomCont = require('../controllers/roomController.js');
const { authentication } = require('../middlewares/auth');

Route.post(
  '/', //create a room
  authentication, 
  RoomCont.createRoom
);
Route.get(
  '/src/:id', // find room by RoomId for specific
  RoomCont.getRoom
);
Route.get(
  '/', // find all room for home
  RoomCont.findAllRoom
)
Route.patch(
  '/join/:id', // find RoomId and joining room push UserId
  authentication,
  RoomCont.joinRoom
)

Route.delete(
  '/:id', // next level delete room only admin
  authentication, //authorization for admin
  RoomCont.deleteRoom
)
module.exports = Route;