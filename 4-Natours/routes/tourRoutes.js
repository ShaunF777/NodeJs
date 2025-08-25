const express = require('express');

const tourController = require('./../controllers/tourController');

const router = express.Router();

router.route('/').get(getAllTours).post(createTour); // The root / refers to the /api/v1/tours
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
