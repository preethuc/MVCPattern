'use strict';

var express = require('express');
var userController = require('../../src/Controller/userController');
var authController = require('../../src/Controller/authController');
var router = express.Router();

//ROUTES
router.route('/signup').post(authController.signup);
router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;