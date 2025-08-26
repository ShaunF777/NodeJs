const express = require('express');

const tourController = require('./../controllers/tourController'); // imports the whole file

const router = express.Router();

// The router.param middleware is used to pre-process URL parameters.
// The `checkID` middleware will run only when the 'id' parameter is present in a route.
router.param('id', tourController.checkID); // Express apps run this way

// Create a checkBody middleware
// Check if body contains the name and price property
// if not, send back 400 (bad request)
// Add it to the post handler stack

router
  // The root '/' refers to the /api/v1/tours in app.js middleware
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour);
router
  // '/:id' refers to the /api/v1/tours in app.js middleware
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
