const fs = require('fs');
// import fs from 'fs'
const Tour = require('../../src/Models/tourModel');
// tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)
// );

//ROUTE HANDLERS
// exports.checkID = (req,res,next,val)=>{
//     console.log(`Tour id is : ${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// }//checkID is invalid ---instead of using MongoDB

// exports.checkBody=(req,res,next)=>{
//     if(!req.body.name || !req.body.price){
//       return res.status(400).json({
//         status:'fail',
//         message:'missing name or price'
//       })
//     }
//     next()
// }  //validate the body --  handled by mongoose
//GET ALL TOUR
exports.getAllTour = async (req, res) => {
  try {
    console.log(req.query);

    //BUILD QUERY
    //1.Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => {
      delete queryObj[el];
      // console.log(el);
    });
    //2.Advanced Filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    //console.log(JSON.parse(queryStr));

    let query = Tour.find(JSON.parse(queryStr));
    // console.log(req.query,queryObj);
    //const tours = await Tour.find(req.query);---query file
    // const tours = await Tour.find(req.body);----all files
    //const query = Tour.find(queryObj); //queryfiles

    //3.Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
      // sort('price ratingsAverage')
    } else {
      query = query.sort('-createdAt');
    }
    //4.Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //5.PAGINATION
    const page = req.query.page * 1 || 1;   // To convert string to number we can multiply to any numbers(Integers)
    const limit = req.query.limit *1 || 100;   // 100 results in a page
    const skip = (page - 1) * limit // if page = 2 then its need to skip 100 results

    // query = query.skip(100).limit(100) will skip 100 limits
    query = query.skip(skip).limit(limit)

    // To show if user enter more pages then expected
    if(req.query.page){
        const numTours = await Tour.countDocuments();
        if(skip>= numTours) throw new Error('This page does not exist')
    }
    //EXECUTE THE QUERY
    const tours = await query;
    // const tours = await Tour.find(
    //   duration: 5,
    //   difficulty: 'easy'
    // })
    //another way of filtering by query
    //const tours = await Tour.find().where('difficulty').equals('difficult');
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
      status: 'fail',
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
      status: 'fail',
      message: err,
    });
  }
  // console.log(req.params);
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   //result: tours.length,
  //   data: {
  //     tour,
  //   },
  // });
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
      status: 'fail',
      message: err,
    });
  }
};
// exports.createTour = async (req, res) => {
//     // const newTour = new Tour({})
//     // newTour.save()
//     const newTour = await Tour.create(req.body)
//     res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour
//         },
//       });
//     }
//console.log(req.body);
// const newId = tours[tours.length - 1].id + 1;
// const newTour = Object.assign({ id: newId }, req.body);
// tours.push(newTour);
// fs.writeFile(
//   `${__dirname}/../dev-data/data/tours-simple.json`,
//   JSON.stringify(tours),
//   (err) => {
//     res.status(201).json({
//       status: 'success',
//       data: {
//         tour: newTour,
//       },
//     });
//   }
// );
//  res.send('Done');

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
      status: 'fail',
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
      status: 'fail',
      error: 'error...!',
    });
  }
};
