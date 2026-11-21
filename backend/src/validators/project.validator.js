const { body } = require('express-validator');

// ----- Project Validator -----
const projectValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .trim(),

  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .trim(),

  body('description')
    .notEmpty()
    .withMessage('Description is required'),

  body('client')
    .optional()
    .trim(),

  body('technologies')
    .optional()
    .isArray()
    .withMessage('Technologies must be an array'),

  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean'),

  body('isFeatured')
    .optional()
    .isBoolean()
    .withMessage('isFeatured must be a boolean'),

  body('completedAt')
    .optional()
    .isISO8601()
    .withMessage('completedAt must be a valid ISO 8601 date'),
];

module.exports = {
  projectValidator,
};
