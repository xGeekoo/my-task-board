const AppError = require('../utils/AppError');

function handleValidationError({ errors }) {
  const errorsArray = Object.values(errors);
  const message = errorsArray
    .map(obj => `Invalid ${obj.path}: ${obj.message}`)
    .join('\n');
  return new AppError(message, 400);
}

function handleCastError(err) {
  return new AppError(`The data type of ${err.path} is incorrect.`, 400);
}

function handleDuplicateKeyError({ keyValue }) {
  const [key, val] = Object.entries(keyValue).at(0);
  return new AppError(
    `The value ${val} of ${key} property is already used.`,
    400
  );
}

function errorController(err, req, res, next) {
  let error;

  if (err.name === 'ValidationError') {
    error = handleValidationError(err);
  } else if (err.name === 'CastError') {
    error = handleCastError(err);
  } else if (err.code === 11000) {
    error = handleDuplicateKeyError(err);
  } else {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    error = err;
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(error);
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      error: error,
      stack: error.stack
    });
  } else {
    if (!error.showError) console.log(error);
    res.status(err.statusCode).json({
      status: error.status,
      message: error.showError ? error.message : 'Something went wrong.'
    });
  }
}

module.exports = errorController;
