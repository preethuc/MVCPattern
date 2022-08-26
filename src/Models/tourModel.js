const mongoose = require('mongoose');
const slugify = require('slugify')
// import mongoose from "mongoose";
const tourSchema = new mongoose.Schema({
  name: {
    type:String,
    required: [true, 'Tour must have a name'],
    unique: [true, 'Tour name must be unique'],
  },
  secretTour:{
    type:Boolean,
    default:false
  },
  note:String,
  duration: {
    type: Number,
    required: [true, 'A TOUR must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 0,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Tour must have a price'],
  },
  priceDiscount: Number,
  Summery: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
},
{
  toJSON: { virtuals: true},
  toObject: { virtuals: true}
}
);
tourSchema.virtual('durationWeeks').get(function(){
  return this.duration / 7;
})
//DOCUMENT MIDDLEWARE----Save m/w only for .save and .create mongoose method
tourSchema.pre('save',function(next){
  this.note = slugify(this.name, {lower: true})
  console.log("save event")
  next()
})
tourSchema.pre('save',function(next){
  console.log("Will save document")
  next()
})
tourSchema.post('save',function(doc,next){
  console.log(doc)
  next()
})
//QUERY MIDDLEWARE 
tourSchema.pre('find',function(next){
  this.find({ secretTour: { $ne: true} })
  next()
})
const Tour = mongoose.model('Tour',tourSchema);

module.exports = Tour;