if(process.env.NODE_ENV == 'development'){
  require('dotenv').config()
}

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 3000;
const io = require('socket.io')(http)
const index = require('./routes/index.js');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

mongoose.connect(process.env.MONGO_URL,
  { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
  )
  .then(_ => {
    console.log('MongoDb now Connected!')
  })
  .catch(err => {
    console.log(err)
  })
  
io.on('connection', function(socket){

  socket.on('send', function (data) {
    io.emit('change-data', data)
  })

  socket.on('disconnect', function() {
    console.log('disconnect!')
    io.emit('roomout')
  })

  socket.on('reload', function () {
    console.log('reload!!')
    io.emit('reload');
  })

  socket.on('joinroom', function () {
    console.log('joining!');
    socket.broadcast.emit('joinroom');
  })

  socket.on('createroom', function () {
    console.log('create room');
    io.emit('createroom')
  })

  socket.on('deleteMsg', function () {
    console.log('delete message')
    io.emit('deleteMsg')
  })
})

app.use('/',index);

app.use(errorHandler);

http.listen(PORT, function() {
  console.log(`Listening on PORT ${PORT}`)
})

module.exports = io