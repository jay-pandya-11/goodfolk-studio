const ApiResponse = require('../utils/ApiResponse');

// ----- Global error handler middleware -----
const errorHandler = (err, req, res, next) => {
  // Log error stack in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Stack:', err.stack);
  }

  // ----- Mongoose CastError: Invalid ObjectId -----
  if (err.name === 'CastError') {
    return ApiResponse.error(res, 400, 'Resource not found');
  }

  // ----- Mongoose ValidationError: Schema validation failure -----
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return ApiResponse.error(res, 400, messages.join(', '));
  }

  // ----- MongoDB Duplicate Key Error (code 11000) -----
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(', ');
    return ApiResponse.error(
      res,
      400,
      `Duplicate field value entered: ${field}`
    );
  }

  // ----- Default: Internal Server Error -----
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return ApiResponse.error(res, statusCode, message);
};

module.exports = { errorHandler };
