const app = require('../src/app');
const mongoose = require('mongoose');
// import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/Data-Natours');
mongoose.connection
  .once('open', () => {
    console.log('DB connected');
  })
  .on('error', (error) => {
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
const server = app.listen(3000, () => console.log('Listening on the PORT 3000'));
//Unhandled promise rejection--error outside express
//without connecting MongoDB
process.on('unhandledRejection', err =>{
  console.log(err.name,err.message)
  console.log('UNHANDLED REJECTION! , Shutting Down.....!')
  server.close(() =>{
    process.exit(1)
  })
})
// //UnCaught catch Exception
// process.on('unCaughtRejection', err =>{
//   console.log(err)
//   console.log('UNCaught REJECTION! , Shutting Down.....!')
//   server.close(() =>{
//     process.exit(1)
//   })
// })
// console.log(xxx)
