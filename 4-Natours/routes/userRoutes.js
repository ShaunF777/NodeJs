const express = require('express');

const userController = require('./../controllers/userController');// imports the whole file

const router = express.Router();

router
 // The root '/' refers to the /api/v1/users in app.js middleware
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
router
 // '/:id' refers to the /api/v1/users in app.js middleware
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
