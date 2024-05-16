class AppError extends Error {
  constructor(error, statusCode, showError = true) {
    if (!error || !statusCode) {
      throw new Error('Please provide a message and a status code.');
    }

    super(error);
    this.statusCode = statusCode;
    this.status = String(statusCode).startsWith('4') ? 'fail' : 'error';
    this.showError = showError;
  }
}

module.exports = AppError;
