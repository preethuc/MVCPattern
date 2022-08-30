'use strict';

var AppError = require('./../../utils/AppError');
var handleCastErrorDB = function handleCastErrorDB(err) {
    var message = 'Invalid ' + err.path + ': ' + err.value + '.';
    return new AppError(message, 400);
};
// error handler by giving in next() function
//DEV Error
var sendErrorDev = function sendErrorDev(err, res) {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack //---error stack in terminal
    });
};
//PROD Error
var sendErrorProd = function sendErrorProd(err, res) {
    console.log(err.isOperational);
    //Operational,trusted error: send message to client
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    //Programming or other unknown error: don't leak error details
    else {
            //1.Log error
            console.error('ERROR', err);
            //2.Send generic message
            res.status(500).json({
                status: 'error',
                message: "Something went wrong"
            });
        }
};
module.exports = function (err, req, res, next) {
    // console.log(err.stack)
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        var error = err;
        if (error.name === 'CastError') error = handleCastErrorDB(error); //---new error created in appError connected with DB
        sendErrorProd(error, res);
    }
};