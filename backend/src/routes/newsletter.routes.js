const router = require('express').Router();
const { subscribe, unsubscribe, getAllSubscribers } = require('../controllers/newsletter.controller');
const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/admin.middleware');

// Public
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

// Admin only
router.get('/subscribers', protect, adminOnly, getAllSubscribers);

module.exports = router;
