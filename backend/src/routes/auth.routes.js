const router = require('express').Router();
const { register, login, getProfile, changePassword } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/admin.middleware');
const { validate } = require('../middleware/validate.middleware');
const { loginValidator, registerValidator, changePasswordValidator } = require('../validators/auth.validator');

// Public
router.post('/login', loginValidator, validate, login);

// Protected
router.get('/profile', protect, getProfile);
router.put('/change-password', protect, changePasswordValidator, validate, changePassword);

// Admin only
router.post('/register', protect, adminOnly, registerValidator, validate, register);

module.exports = router;
