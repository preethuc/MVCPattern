'use strict';

var User = require('./../Models/userModel');
var catchAsync = require('./../../utils/catchAsync');
exports.signup = catchAsync(async function (req, res, next) {
    var newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser
        }
    });
});