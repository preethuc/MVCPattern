'use strict';

var express = require('express');
// import express from 'express'
var app = express();
var morgan = require('morgan');
// import morgan from 'mapp.use(morgan('dev'));//morgan';
var AppError = require('../utils/AppError');
var globalErrorHandler = require('./Controller/errorController');
// const globalErrorHandler = require('../src/Controller/errorController')
var tourRouter = require('../src/Routes/tourRoutes');
var userRouter = require('../src/Routes/userRoutes');
//1.MIDDLEWARE
app.use(express.json());
app.use(morgan('dev'));
app.use(function (req, res, next) {
  console.log('Hello from Middleware');
  next();
});
// app.use((req, res, next) => {
//   req.reqestTime = new Date().toISOString();
//   next();
// });

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//Error Handling
// app.all('*',(req,res,next)=>{
//   res.status(404).json({
//     status: 'fail',
//     message: `can't find ${req.originalUrl}`
//   })
// })
// app.all('*', (req, res, next)=>{
//   const err = new Error(`Can't find${req.originalUrl}`)
//   err.status = 'Fail',
//   err.statusCode = 404
//   next(err)
// })
app.all('*', function (req, res, next) {
  next(new AppError('can\'t find ' + req.originalUrl + ' on this server!', 404));
});
app.use(globalErrorHandler);

module.exports = app;