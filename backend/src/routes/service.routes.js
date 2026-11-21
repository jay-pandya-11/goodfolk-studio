const router = require('express').Router();
const {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
} = require('../controllers/service.controller');
const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/admin.middleware');
const { validate } = require('../middleware/validate.middleware');
const { serviceValidator } = require('../validators/service.validator');

// Public
router.get('/', getAllServices);
router.get('/:slug', getServiceBySlug);

// Admin only
router.post('/', protect, adminOnly, serviceValidator, validate, createService);
router.put('/:id', protect, adminOnly, updateService);
router.delete('/:id', protect, adminOnly, deleteService);

module.exports = router;
