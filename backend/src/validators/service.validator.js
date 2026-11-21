const { body } = require('express-validator');

// ----- Service Validator -----
const serviceValidator = [
  body('number')
    .notEmpty()
    .withMessage('Service number is required'),

  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .trim(),

  body('description')
    .notEmpty()
    .withMessage('Description is required'),

  body('icon')
    .optional(),

  body('tag')
    .optional()
    .trim(),

  body('deliverables')
    .optional()
    .isArray()
    .withMessage('Deliverables must be an array'),

  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean'),

  body('order')
    .optional()
    .isInt()
    .withMessage('Order must be an integer'),
];

module.exports = {
  serviceValidator,
};
