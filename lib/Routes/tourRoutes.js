'use strict';

var express = require('express');
var router = express.Router();
var tourController = require('../../src/Controller/tourController');
//ROUTES
// router.param('id',(req,res,next,val)=>{
//   console.log(`Tour id is: ${val}`);
//   next()
// })
//middleware--param
//router.param('id',tourController.checkID)

router.route('/').get(tourController.getAllTour).post(tourController.checkBody, tourController.createTour);
router.route('/:id').get(tourController.getTourById).patch(tourController.updateTour).delete(tourController.removeTour);

module.exports = router;
//# sourceMappingURL=tourRoutes.js.map