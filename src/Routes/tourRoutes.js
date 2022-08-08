const express = require('express');
const router = express.Router();
const tourController = require('../../src/Controller/tourController')
//ROUTES
// router.param('id',(req,res,next,val)=>{
//   console.log(`Tour id is: ${val}`);
//   next()
// })
//middleware--param
//router.param('id',tourController.checkID)

router
  .route('/')
  .get(tourController.getAllTour)
  .post(tourController.checkBody,tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTourById)
  .patch(tourController.updateTour)
  .delete(tourController.removeTour);

module.exports = router
