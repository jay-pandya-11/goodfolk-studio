const router = require('express').Router();
const {
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/blog.controller');
const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/admin.middleware');
const { validate } = require('../middleware/validate.middleware');
const { blogValidator } = require('../validators/blog.validator');

// Public — /category/:category BEFORE /:slug
router.get('/', getAllPosts);
router.get('/category/:category', getPostsByCategory);
router.get('/:slug', getPostBySlug);

// Admin only
router.post('/', protect, adminOnly, blogValidator, validate, createPost);
router.put('/:id', protect, adminOnly, updatePost);
router.delete('/:id', protect, adminOnly, deletePost);

module.exports = router;
