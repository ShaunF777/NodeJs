const Tour = require('./../models/tourModel');

// Loads this getAllTours module onto the exports Object
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  // const tour = tours.find((el) => el.id === id);

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {
  try {
    // Call the create method on the Tour model to create a new document
    const newTour = await Tour.create(req.body); // waits for req.body to be filled

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    // Typically a creation validation error for rejected promise
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated tour here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    // 204 means no content
    status: 'success',
    data: null,
  });
};
