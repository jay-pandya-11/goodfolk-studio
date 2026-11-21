const { body } = require('express-validator');

// ----- Blog Post Validator -----
const blogValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .trim(),

  body('content')
    .notEmpty()
    .withMessage('Content is required'),

  body('excerpt')
    .optional()
    .trim(),

  body('category')
    .optional()
    .trim(),

  body('tags')
    .optional()
    .isArray()
    .withMessage('Tags must be an array'),

  body('isPublished')
    .optional()
    .isBoolean()
    .withMessage('isPublished must be a boolean'),
];

module.exports = {
  blogValidator,
};
