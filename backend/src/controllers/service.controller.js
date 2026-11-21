const Service = require('../models/Service');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Get all active services
 * @route   GET /api/services
 * @access  Public
 */
const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ order: 1 });
    return ApiResponse.success(res, 200, 'Services fetched successfully', { services });
  } catch (error) {
    console.error('Get all services error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching services');
  }
};

/**
 * @desc    Get a single service by slug
 * @route   GET /api/services/:slug
 * @access  Public
 */
const getServiceBySlug = async (req, res) => {
  try {
    const service = await Service.findOne({ slug: req.params.slug });
    if (!service) {
      return ApiResponse.error(res, 404, 'Service not found');
    }
    return ApiResponse.success(res, 200, 'Service fetched successfully', { service });
  } catch (error) {
    console.error('Get service by slug error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching service');
  }
};

/**
 * @desc    Create a new service
 * @route   POST /api/services
 * @access  Private (Admin only)
 */
const createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    return ApiResponse.success(res, 201, 'Service created successfully', { service });
  } catch (error) {
    console.error('Create service error:', error.message);
    return ApiResponse.error(res, 500, 'Server error creating service');
  }
};

/**
 * @desc    Update a service
 * @route   PUT /api/services/:id
 * @access  Private (Admin only)
 */
const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return ApiResponse.error(res, 404, 'Service not found');
    }

    Object.assign(service, req.body);
    await service.save();

    return ApiResponse.success(res, 200, 'Service updated successfully', { service });
  } catch (error) {
    console.error('Update service error:', error.message);
    return ApiResponse.error(res, 500, 'Server error updating service');
  }
};

/**
 * @desc    Delete a service
 * @route   DELETE /api/services/:id
 * @access  Private (Admin only)
 */
const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return ApiResponse.error(res, 404, 'Service not found');
    }
    return ApiResponse.success(res, 200, 'Service deleted successfully');
  } catch (error) {
    console.error('Delete service error:', error.message);
    return ApiResponse.error(res, 500, 'Server error deleting service');
  }
};

module.exports = {
  getAllServices,
  getServiceBySlug,
  createService,
  updateService,
  deleteService,
};
