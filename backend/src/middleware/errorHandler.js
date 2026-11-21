/**
 * errorHandler — Global error handling middleware
 *
 * Catches all errors thrown or passed via next(err) in
 * route handlers and returns a consistent JSON response.
 */
const ApiResponse = require('../utils/ApiResponse');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // Log the error stack in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return ApiResponse.error(res, 400, 'Resource not found');
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue).join(', ');
    return ApiResponse.error(res, 400, `Duplicate value for: ${field}`);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    return ApiResponse.error(res, 400, 'Validation Error', messages);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return ApiResponse.error(res, 401, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    return ApiResponse.error(res, 401, 'Token has expired');
  }

  // Default server error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return ApiResponse.error(res, statusCode, message);
};

module.exports = errorHandler;
