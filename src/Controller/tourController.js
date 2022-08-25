const fs = require('fs');
// import fs from 'fs'
const Tour = require('../../src/Models/tourModel');
const APIFeatures = require('../../utils/APIFeatures')
exports.aliasTopTours = (req,res,next) => {
  req.query.limit = '5'
  req.query.sort = '-ratingsAverage,price'
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
  next()
}

//GET ALL TOUR
exports.getAllTour = async (req, res) => {
  try {
    //EXECUTE THE QUERY
    const features = new APIFeatures(Tour.find(),req.query).filter().sorting().limitFields().pagination()
    const tours = await features.query;
    // const tours = await Tour.find()
    
    //another way of filtering by query
    // const tours = await Tour.find().where('difficulty').equals('easy');
    //SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: '1',
      message: err,
    });
  }
};

//GET TOUR by Id
exports.getTourById = async (req, res) => {
  try {
    const tours = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: '2',
      message: err,
    });
  }

};

//POST TOUR
exports.createTour = async (req, res) => {
  try {
    //const newTour = new Tour({})
    // newTour.save()
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: '3',
      message: err,
    });
  }
};


// PATCH / PUT TOUR
exports.updateTour = async (req, res) => {
  try {
    const tours = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      tour: '<Updated tour here....!>',
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: '4',
      error: 'error...!',
    });
  }
};

//DELETE TOUR
exports.removeTour = async (req, res) => {
  //   res.status(200).json({
  //   status: 'success',
  //   data: null
  //   });
  try {
    tours = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: '5',
      error: 'error...!',
    });
  }
};

exports.getTourStats = async (req,res) => {
  try{
    const stats = await Tour.aggregate([
      {
      $match: { ratingsAverage: {$gte : 4.5} } 
      },
  
  {
      $group: {
        // _id: null,
         _id: { $toUpper: '$difficulty' },
        // _id:'$difficulty',
        // _id:'$ratingsAverage',

        numTours:{$sum:1},
        numRatings:{$sum:'$ratingsQuantity'},
        avgRating: {$avg : '$ratingsAverage'},
        avgPrice: { $avg: '$price'},
        minPrice: {$min:'$price'},
        maxPrice: {$max:'$price'}
      }, 
  },
  {
      $sort:{avgPrice:1}
  },
  // {
  //   $match:{_id: { $ne: 'EASY'}}
  // }
    ]);
    res.status(200).json({
      status: 'success',
      data: stats,
    });
  }
  catch(err){
    res.status(400).json({
      status: 'fail',
      error: 'error...!',
    });
  }
}
exports.getMonthlyPlan = async (req,res) =>{
  try{
    const year = req.params.year * 1;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match:{
          startDates: {
            $gte:new Date(`${year}-01-01`),
            $lte:new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id:{ $month: '$startDates'},
          numTourStarts:{ $sum: 1},
          tours: { $push: '$name'}
        }
      },
      {
        $addFields: { month: '$_id'}
      },
      {
        $project: {
          _id: 0
        }
      },
      {
        $sort: {
          numTourStarts: -1
        }
      },
      {
        $limit: 6
      }
    ])

    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  }
  catch(err){
    res.status(400).json({
      status: 'fail',
      error: 'error...!',
    });
  }
}