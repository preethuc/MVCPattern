const express = require('express');
const userController = require('../../src/Controller/userController');
const authController = require('../../src/Controller/authController')
const router = express.Router();

//ROUTES
router.route('/signup').post(authController.signup)
router.route('/').get(userController .getAllUsers).post(userController .createUser);
router.route('/:id').get(userController .getUser).patch(userController .updateUser).delete(userController . deleteUser);

module.exports = router;
