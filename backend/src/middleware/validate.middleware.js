const { validationResult } = require('express-validator');
const ApiResponse = require('../utils/ApiResponse');

// ----- Validate request: Check express-validator results -----
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Format errors into a clean array of { field, message }
    const formattedErrors = errors.array().map((err) => ({
      field: err.path,
      message: err.msg,
    }));

    // Return 400 with formatted validation errors in the data field
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }

  next();
};

module.exports = { validate };
