const express = require('express');

const getAllUsers = (req, res) => {
  res.status(500).json({
    // 500 = Internal server error
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

const router = express.Router();

router.route('/').get(getAllUsers).post(createUser); // The root / refers to the /api/v1/users
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
