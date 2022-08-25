const fs = require('fs');
const mongoose = require('mongoose');
const Tour = require('../../src/Models/tourModel');

//mongoose connection

mongoose.connect('mongodb://localhost:27017/Data-Natours');
mongoose.connection


  .once('open', () => {
    console.log('DB connected');
  })
  .on('error', (error) => {
    console.log('error is:', error);
  });

//read the file and named it as tours
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//import data into database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("Succesfully created Data's");
  } catch (err) {
    console.log('err:', err);
  }
  process.exit();
};

//Delete all data from DB

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Successfully data deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv);
