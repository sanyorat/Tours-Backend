const express = require('express');
const morgan = require('morgan');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoutes');
const AppError = require('./utils/appError');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
// app.get('/', (req, res) =>
//   res.status(200).json({ message: 'Hello from the server' })
// );

// app.post('/post', (req, res) => {
//   res.send('POST request to the homepage');
// });

//Routes

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

app.use('*', (req, res, next) => {
  // // res.status(404).json({
  // //   status: 'fail',
  // //   message: `Coudn't find ${req.originalUrl} on this server`,
  // // });
  // const err = new Error(`Coudn't find ${req.originalUrl} on this server`);
  // err.statusCode = 404;
  // err.status = 'fail';

  next(new AppError(`Coudn't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
