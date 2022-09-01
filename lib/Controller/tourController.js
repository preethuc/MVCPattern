'use strict';

var fs = require('fs');
// import fs from 'fs'
var Tour = require('../../src/Models/tourModel');
var APIFeatures = require('../../utils/APIFeatures');
var AppError = require('../../utils/AppError');
var catchAsync = require('../../utils/catchAsync');
exports.aliasTopTours = function (req, res, next) {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
//GET ALL TOUR
exports.getAllTour = catchAsync(async function (req, res, next) {
  //EXECUTE THE QUERY
  var features = new APIFeatures(Tour.find(), req.query).filter().sorting().limitFields().pagination();
  var tours = await features.query;
  // const tours = await Tour.find()
  //another way of filtering by query
  // const tours = await Tour.find().where('difficulty').equals('easy');
  // Tour.find().populate('tours','name')

  //SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
  // try {
  // } catch (err) {
  //   res.status(400).json({
  //     status: '1',
  //     message: err,
  //   });
  // }
});
//GET TOUR by Id
exports.getTourById = catchAsync(async function (req, res, next) {
  var tours = await Tour.findById(req.params.id);
  if (!tours) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
});
//POST TOUR
exports.createTour = catchAsync(async function (req, res, next) {

  //const newTour = new Tour({})
  // newTour.save()
  var newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour
    }
  });
});
// PATCH / PUT TOUR
exports.updateTour = catchAsync(async function (req, res, next) {
  var tours = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!tours) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    tour: '<Updated tour here....!>',
    data: {
      tours: tours
    }
  });
});
//DELETE TOUR
exports.removeTour = catchAsync(async function (req, res, next) {
  //   res.status(200).json({
  //   status: 'success',
  //   data: null
  //   });
  tours = await Tour.findByIdAndDelete(req.params.id);
  if (!tours) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null
  });
});
exports.getTourStats = catchAsync(async function (req, res, next) {

  var stats = await Tour.aggregate([{
    $match: { ratingsAverage: { $gte: 4.5 } }
  }, {
    $group: {
      // _id: null,
      _id: { $toUpper: '$difficulty' },
      // _id:'$difficulty',
      // _id:'$ratingsAverage',
      numTours: { $sum: 1 },
      numRatings: { $sum: '$ratingsQuantity' },
      avgRating: { $avg: '$ratingsAverage' },
      avgPrice: { $avg: '$price' },
      minPrice: { $min: '$price' },
      maxPrice: { $max: '$price' }
    }
  }, {
    $sort: { avgPrice: 1 }
  }]
  // {
  //   $match:{_id: { $ne: 'EASY'}}
  // }
  );
  res.status(200).json({
    status: 'success',
    data: stats
  });
});
exports.getMonthlyPlan = catchAsync(async function (req, res, next) {
  var year = req.params.year * 1;
  var plan = await Tour.aggregate([{
    $unwind: '$startDates'
  }, {
    $match: {
      startDates: {
        $gte: new Date(year + '-01-01'),
        $lte: new Date(year + '-12-31')
      }
    }
  }, {
    $group: {
      _id: { $month: '$startDates' },
      numTourStarts: { $sum: 1 },
      tours: { $push: '$name' }
    }
  }, {
    $addFields: { month: '$_id' }
  }, {
    $project: {
      _id: 0
    }
  }, {
    $sort: {
      numTourStarts: -1
    }
  }, {
    $limit: 6
  }]);
  res.status(200).json({
    status: 'success',
    data: {
      plan: plan
    }
  });
});