const { body } = require('express-validator');

// ----- Contact Form Validator -----
const contactValidator = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .trim(),

  body('email')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),

  body('phone')
    .optional()
    .trim(),

  body('service')
    .notEmpty()
    .withMessage('Service is required')
    .trim(),

  body('message')
    .notEmpty()
    .withMessage('Message is required')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Message must be at least 10 characters'),
];

// ----- Contact Status Update Validator -----
const contactStatusValidator = [
  body('status')
    .notEmpty()
    .withMessage('Status is required')
    .isIn(['new', 'read', 'replied', 'closed'])
    .withMessage('Status must be one of: new, read, replied, closed'),

  body('notes')
    .optional()
    .trim(),
];

module.exports = {
  contactValidator,
  contactStatusValidator,
};
