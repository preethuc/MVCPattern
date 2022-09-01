'use strict';

var app = require('../src/app');
var mongoose = require('mongoose');
// import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Data-Natours');
mongoose.connection.once('open', function () {
  console.log('DB connected');
}).on('error', function (error) {
  console.log('error is:', error);
});

// const testTour = new Tour({
//   name: 'The Park Camper',
//   rating: 4.9,
//   price: 345,
// });
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('Error:', err);
//   });
//4.START SERVER
var server = app.listen(3000, function () {
  return console.log('Listening on the PORT 3000');
});
//Unhandled promise rejection--error outside express
//without connecting MongoDB
process.on('unhandledRejection', function (err) {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION! , Shutting Down.....!');
  server.close(function () {
    process.exit(1);
  });
});
// //UnCaught catch Exception
// process.on('unCaughtRejection', err =>{
//   console.log(err)
//   console.log('UNCaught REJECTION! , Shutting Down.....!')
//   server.close(() =>{
//     process.exit(1)
//   })
// })
// console.log(xxx)