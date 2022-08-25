'use strict';

var _require = require('express'),
    Router = _require.Router;

var express = require('express');
var userController = require('../../src/Controller/userController');
var router = express.Router();

//ROUTES
router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getUser).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;