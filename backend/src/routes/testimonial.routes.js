const router = require('express').Router();
const {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonial.controller');
const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/admin.middleware');
const { validate } = require('../middleware/validate.middleware');
const { testimonialValidator } = require('../validators/testimonial.validator');

// Public
router.get('/', getAllTestimonials);

// Admin only
router.post('/', protect, adminOnly, testimonialValidator, validate, createTestimonial);
router.put('/:id', protect, adminOnly, updateTestimonial);
router.delete('/:id', protect, adminOnly, deleteTestimonial);

module.exports = router;
