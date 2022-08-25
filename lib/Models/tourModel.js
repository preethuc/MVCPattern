'use strict';

var mongoose = require('mongoose');
var slugify = require('slugify');
// import mongoose from "mongoose";
var tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Tour must have a name'],
    unique: [true, 'Tour name must be unique']
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
    required: [true, 'A tour must have a difficulty']
  },
  ratingsAverage: {
    type: Number,
    default: 0
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, 'Tour must have a price']
  },
  priceDiscount: Number,
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
tourSchema.pre('save', function (next) {
  this.note = slugify(this.name, { lower: true });
  console.log("save event");
  next();
});

var Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;