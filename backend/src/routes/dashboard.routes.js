const router = require('express').Router();
const { getDashboardStats } = require('../controllers/dashboard.controller');
const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/admin.middleware');

// Admin only
router.get('/', protect, adminOnly, getDashboardStats);

module.exports = router;
