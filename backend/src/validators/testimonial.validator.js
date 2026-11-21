const { body } = require('express-validator');

// ----- Testimonial Validator -----
const testimonialValidator = [
  body('clientName')
    .notEmpty()
    .withMessage('Client name is required')
    .trim(),

  body('content')
    .notEmpty()
    .withMessage('Testimonial content is required'),

  body('company')
    .optional()
    .trim(),

  body('role')
    .optional()
    .trim(),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),

  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean'),

  body('order')
    .optional()
    .isInt()
    .withMessage('Order must be an integer'),
];

module.exports = {
  testimonialValidator,
};
