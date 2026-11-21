const router = require('express').Router();
const {
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/project.controller');
const { protect } = require('../middleware/auth.middleware');
const { adminOnly } = require('../middleware/admin.middleware');
const { validate } = require('../middleware/validate.middleware');
const { projectValidator } = require('../validators/project.validator');

// Public — /featured BEFORE /:slug
router.get('/', getAllProjects);
router.get('/featured', getFeaturedProjects);
router.get('/:slug', getProjectBySlug);

// Admin only
router.post('/', protect, adminOnly, projectValidator, validate, createProject);
router.put('/:id', protect, adminOnly, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

module.exports = router;
