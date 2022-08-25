'use strict';

var fs = require('fs');
// import fs from 'fs'
var Tour = require('../../src/Models/tourModel');
var APIFeatures = require('../../utils/APIFeatures');
exports.aliasTopTours = function (req, res, next) {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

//GET ALL TOUR
exports.getAllTour = async function (req, res) {
  try {
    //EXECUTE THE QUERY
    var features = new APIFeatures(Tour.find(), req.query).filter().sorting().limitFields().pagination();
    var _tours = await features.query;
    // const tours = await Tour.find()

    //another way of filtering by query
    // const tours = await Tour.find().where('difficulty').equals('easy');
    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: _tours.length,
      data: {
        tours: _tours
      }
    });
  } catch (err) {
    res.status(400).json({
      status: '1',
      message: err
    });
  }
};

//GET TOUR by Id
exports.getTourById = async function (req, res) {
  try {
    var _tours2 = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      results: _tours2.length,
      data: {
        tours: _tours2
      }
    });
  } catch (err) {
    res.status(400).json({
      status: '2',
      message: err
    });
  }
};

//POST TOUR
exports.createTour = async function (req, res) {
  try {
    //const newTour = new Tour({})
    // newTour.save()
    var newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
  } catch (err) {
    res.status(400).json({
      status: '3',
      message: err
    });
  }
};

// PATCH / PUT TOUR
exports.updateTour = async function (req, res) {
  try {
    var _tours3 = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: 'success',
      tour: '<Updated tour here....!>',
      data: {
        tours: _tours3
      }
    });
  } catch (err) {
    res.status(400).json({
      status: '4',
      error: 'error...!'
    });
  }
};

//DELETE TOUR
exports.removeTour = async function (req, res) {
  //   res.status(200).json({
  //   status: 'success',
  //   data: null
  //   });
  try {
    tours = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(400).json({
      status: '5',
      error: 'error...!'
    });
  }
};

exports.getTourStats = async function (req, res) {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: 'error...!'
    });
  }
};
exports.getMonthlyPlan = async function (req, res) {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      error: 'error...!'
    });
  }
};