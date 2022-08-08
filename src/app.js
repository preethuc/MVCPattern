const express = require('express');
const app = express();
const morgan = require('morgan');
const tourRouter = require('../src/Routes/tourRoutes');
const userRouter = require('../src/Routes/userRoutes');
//1.MIDDLEWARE

app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
  console.log('Hello from Middleware');
  next();
});
app.use((req, res, next) => {
  req.reqestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
