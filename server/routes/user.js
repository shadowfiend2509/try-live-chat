const Route = require('express').Router();
const UserCont = require('../controllers/userController.js');

Route.post('/login', UserCont.login);
Route.post('/register', UserCont.register);

module.exports = Route;