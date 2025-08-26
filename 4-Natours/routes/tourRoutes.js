const express = require('express');

const tourController = require('./../controllers/tourController'); // imports the whole file

const router = express.Router();

// Param middleware only runs for certain parameters like an id
router.param('id', tourController.checkID); // Express apps run this way

router
  // The root '/' refers to the /api/v1/tours in app.js middleware
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  // '/:id' refers to the /api/v1/tours in app.js middleware
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
