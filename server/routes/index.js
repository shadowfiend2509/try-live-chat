const Route = require('express').Router();
const Room = require('./room');
const User = require('./user');
const Msg = require('./msg')

Route.use('/', User);
Route.use('/rooms', Room);
Route.use('/msg', Msg)

module.exports = Route;