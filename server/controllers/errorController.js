const AppError = require('../utils/AppError');

function handleValidationError({ errors }) {
  const errorsArray = Object.values(errors);
  const message = errorsArray.map(obj => obj.message).join('\n');
  return new AppError(message, 400);
}

function errorController(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  let error;
  switch (err.name) {
    case 'ValidationError':
      error = handleValidationError(err);
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
