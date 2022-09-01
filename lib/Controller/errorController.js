'use strict';

var AppError = require('./../../utils/AppError');
var handleCastErrorDB = function handleCastErrorDB(err) {
    var message = 'Invalid ' + err.path + ': ' + err.value + '.';
    return new AppError(message, 400); //---new error created in appError connected with DB
};
var handleDuplicateFieldDB = function handleDuplicateFieldDB(err) {
    var value = err.message.match(/(["'])(\\?.)*?\1/)[0];
    // const key = err.message.match(/(["'])(\\?.)*?\1/)
    // console.log(key)
    console.log(value);
    var message = 'Duplicate field value:' + value + '. Please use another value';
    return new AppError(message, 400); //---new error created in appError connected with DB
};
var handleValidationErrorDB = function handleValidationErrorDB(err) {
    var errors = Object.values(err.errors).map(function (el) {
        return el.message;
    });
    var message = 'Invalid input data. ' + errors.join('. ');
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
    // console.log(err.isOperational);
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
                message: "Something went wrong",
                error: err
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
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldDB(error);
        if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

        sendErrorProd(error, res);
    }
};