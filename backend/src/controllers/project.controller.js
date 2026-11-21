const Project = require('../models/Project');
const ApiResponse = require('../utils/ApiResponse');
const { getPagination, getPaginationData } = require('../utils/pagination');

/**
 * @desc    Get all published projects (with pagination & category filter)
 * @route   GET /api/projects
 * @access  Public
 */
const getAllProjects = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const filter = { isPublished: true };
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const [projects, total] = await Promise.all([
      Project.find(filter).sort({ completedAt: -1 }).skip(skip).limit(limit),
      Project.countDocuments(filter),
    ]);

    return ApiResponse.success(res, 200, 'Projects fetched successfully', {
      projects,
      pagination: getPaginationData(total, page, limit),
    });
  } catch (error) {
    console.error('Get all projects error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching projects');
  }
};

/**
 * @desc    Get featured published projects
 * @route   GET /api/projects/featured
 * @access  Public
 */
const getFeaturedProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isPublished: true, isFeatured: true })
      .sort({ completedAt: -1 })
      .limit(6);
    return ApiResponse.success(res, 200, 'Featured projects fetched successfully', { projects });
  } catch (error) {
    console.error('Get featured projects error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching featured projects');
  }
};

/**
 * @desc    Get a single project by slug
 * @route   GET /api/projects/:slug
 * @access  Public
 */
const getProjectBySlug = async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, isPublished: true });
    if (!project) {
      return ApiResponse.error(res, 404, 'Project not found');
    }
    return ApiResponse.success(res, 200, 'Project fetched successfully', { project });
  } catch (error) {
    console.error('Get project by slug error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching project');
  }
};

/**
 * @desc    Create a new project
 * @route   POST /api/projects
 * @access  Private (Admin only)
 */
const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    return ApiResponse.success(res, 201, 'Project created successfully', { project });
  } catch (error) {
    console.error('Create project error:', error.message);
    return ApiResponse.error(res, 500, 'Server error creating project');
  }
};

/**
 * @desc    Update a project
 * @route   PUT /api/projects/:id
 * @access  Private (Admin only)
 */
const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return ApiResponse.error(res, 404, 'Project not found');
    }

    Object.assign(project, req.body);
    await project.save();

    return ApiResponse.success(res, 200, 'Project updated successfully', { project });
  } catch (error) {
    console.error('Update project error:', error.message);
    return ApiResponse.error(res, 500, 'Server error updating project');
  }
};

/**
 * @desc    Delete a project
 * @route   DELETE /api/projects/:id
 * @access  Private (Admin only)
 */
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return ApiResponse.error(res, 404, 'Project not found');
    }
    return ApiResponse.success(res, 200, 'Project deleted successfully');
  } catch (error) {
    console.error('Delete project error:', error.message);
    return ApiResponse.error(res, 500, 'Server error deleting project');
  }
};

module.exports = {
  getAllProjects,
  getFeaturedProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
};
