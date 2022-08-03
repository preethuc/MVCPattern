const { Router } = require('express');
const express = require('express');
const userController = require('./../Controller/userController');
const router = express.Router();

//ROUTES
router.route('/').get(userController .getAllUsers).post(userController .createUser);
router.route('/:id').get(userController .getUser).patch(userController .updateUser).delete(userController . deleteUser);

module.exports = router;
