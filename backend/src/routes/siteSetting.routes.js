const router = require('express').Router();
const { getSettingsByGroup, updateSettings } = require('../controllers/siteSetting.controller');
const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/admin.middleware');

// Public
router.get('/:group', getSettingsByGroup);

// Admin only
router.put('/', protect, adminOnly, updateSettings);

module.exports = router;
