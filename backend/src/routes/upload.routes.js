const router = require('express').Router();
const { uploadImage, uploadImages } = require('../controllers/upload.controller');
const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/admin.middleware');
const { uploadSingle, uploadMultiple } = require('../middleware/upload.middleware');

// Admin only
router.post('/image', protect, adminOnly, uploadSingle, uploadImage);
router.post('/images', protect, adminOnly, uploadMultiple, uploadImages);

module.exports = router;
