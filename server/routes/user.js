const Route = require('express').Router();
const UserCont = require('../controllers/userController.js');
const { authentication } = require('../middlewares/auth');

Route.post('/login', UserCont.login);
Route.post('/register', UserCont.register);
Route.get('/', authentication, UserCont.ceklogin);

module.exports = Route;