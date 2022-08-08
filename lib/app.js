'use strict';

var express = require('express');
var app = express();
var morgan = require('morgan');
var tourRouter = require('../src/Routes/tourRoutes');
var userRouter = require('../src/Routes/userRoutes');
//1.MIDDLEWARE

app.use(express.json());
app.use(morgan('dev'));
app.use(function (req, res, next) {
  console.log('Hello from Middleware');
  next();
});
app.use(function (req, res, next) {
  req.reqestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
//# sourceMappingURL=app.js.map