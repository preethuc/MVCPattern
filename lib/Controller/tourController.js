'use strict';

var fs = require('fs');
// import fs from 'fs'
var Tour = require('../../src/Models/tourModel');

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
exports.getAllTour = function (req, res) {
  res.status(200).json({
    status: 'success'
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

//GET TOUR by Id
exports.getTourById = function (req, res) {
  console.log(req.params);
  var id = req.params.id * 1;
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
// exports.createTour = async(req, res) => {
//   try{
//     //const newTour = new Tour({})
//     // newTour.save()
//     const newTour = await Tour.create(req.body)
//   res.status(201).json({
//         status: 'success',
//         data: {
//           tour: newTour,
//         },
//       });

//   } catch(err){
//        res.status(400).json({
//         status:'fail',
//         message:err
//        })
//   }
// }
exports.createTour = function (req, res) {
  //const newTour = new Tour({})
  // newTour.save()
  res.status(201).json({
    status: 'success'
    // data: {
    //   tour: newTour,
    // },
  });
};
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
exports.updateTour = function (req, res) {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here....!>'
    }
  });
};

//DELETE TOUR
exports.removeTour = function (req, res) {

  //   res.status(200).json({
  //   status: 'success',
  //   data: null
  //   });
  res.status(204).json({
    status: 'success',
    data: null
  });
};
//# sourceMappingURL=tourController.js.map