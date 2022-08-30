'use strict';

var mongoose = require('mongoose');
var slugify = require('slugify');
var validator = require('validator');
// import mongoose from "mongoose";
var tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'],
    unique: [true, 'Tour name must be unique'],
    trim: true,
    //validators
    maxlength: [60, 'A tour name must have less or equal than 40 characters'],
    minlength: [10, 'A tour name must have greater or equal than 10 characters']
    //own validators
    //  validate: [validator.isAlpha, 'Tour name must only contains alphabets']
  },
  secretTour: {
    type: Boolean,
    default: false
  },
  note: String,
  duration: {
    type: Number,
    required: [true, 'A TOUR must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
    //validators
    enum: {
      //enum validator ---- strings
      values: ['easy', 'medium', 'difficult'],
      message: 'Difficulty must be easy, medium or difficult'
    }
  },
  ratingsAverage: {
    type: Number,
    default: 0,
    //validators
    min: [1, 'A Tour must have greater or equal to 1.0'],
    max: [5, 'A Tour must have less or equal to 5.0']
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'Tour must have a price']
  },
  priceDiscount: {
    type: Number,
    validate: {
      validator: function validator(disPrice) {
        return disPrice < this.price; //the range is false --- error occurs
      },
      message: 'Discount price {VALUE} must be less than the regular price'
    }
  },
  Summery: {
    type: String,
    trim: true

  },
  description: {
    type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a image']
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date]
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
//DOCUMENT MIDDLEWARE----Save m/w only for .save and .create mongoose method
tourSchema.pre('save', function (next) {
  this.note = slugify(this.name, { lower: true });
  console.log("save event");
  next();
});
tourSchema.pre('save', function (next) {
  console.log("Will save document");
  next();
});
tourSchema.post('save', function (doc, next) {
  console.log(doc);
  next();
});
//QUERY MIDDLEWARE 
tourSchema.pre(/^find/, function (next) {
  //trigger the events starts with find
  //tourSchema.pre('find',function(next){
  //tourSchema.pre('findById',function(next){
  this.find({ secretTour: { $ne: true } });
  next();
});
//AGGREGATION MIDDLEWARE
//used in monthlyplan and stats routes
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } }); //added on the firstline
  // this.pipeline().shift()  //remove first line
  console.log(this.pipeline());
  next();
});

var Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;