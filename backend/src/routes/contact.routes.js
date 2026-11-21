const router = require('express').Router();
const {
  submitContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
  getContactStats,
} = require('../controllers/contact.controller');
const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/admin.middleware');
const { validate } = require('../middleware/validate.middleware');
const { contactValidator, contactStatusValidator } = require('../validators/contact.validator');

// Public
router.post('/', contactValidator, validate, submitContact);

// Admin only — /stats BEFORE /:id
router.get('/stats', protect, adminOnly, getContactStats);
router.get('/', protect, adminOnly, getAllContacts);
router.get('/:id', protect, adminOnly, getContactById);
router.put('/:id', protect, adminOnly, contactStatusValidator, validate, updateContact);
router.delete('/:id', protect, adminOnly, deleteContact);

module.exports = router;
