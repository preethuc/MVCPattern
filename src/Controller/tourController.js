const fs = require('fs');
const Tour = require('../../src/Models/tourModel');

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

exports.checkBody=(req,res,next)=>{
    if(!req.body.name || !req.body.price){
      return res.status(400).json({
        status:'fail',
        message:'missing name or price'
      })
    }
    next()
}
//GET ALL TOUR
exports.getAllTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

//GET TOUR by Id
exports.getTourById = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
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
exports.createTour = (req, res) => {
  res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
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
exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here....!>',
    },
  });
};

//DELETE TOUR
exports.removeTour = (req, res) => {
  
  //   res.status(200).json({
  //   status: 'success',
  //   data: null
  //   });
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
