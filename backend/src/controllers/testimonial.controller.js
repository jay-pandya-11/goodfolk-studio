const Testimonial = require('../models/Testimonial');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Get all published testimonials
 * @route   GET /api/testimonials
 * @access  Public
 */
const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isPublished: true })
      .sort({ order: 1 })
      .populate('project', 'title slug');
    return ApiResponse.success(res, 200, 'Testimonials fetched successfully', { testimonials });
  } catch (error) {
    console.error('Get all testimonials error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching testimonials');
  }
};

/**
 * @desc    Create a new testimonial
 * @route   POST /api/testimonials
 * @access  Private (Admin only)
 */
const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    return ApiResponse.success(res, 201, 'Testimonial created successfully', { testimonial });
  } catch (error) {
    console.error('Create testimonial error:', error.message);
    return ApiResponse.error(res, 500, 'Server error creating testimonial');
  }
};

/**
 * @desc    Update a testimonial
 * @route   PUT /api/testimonials/:id
 * @access  Private (Admin only)
 */
const updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      return ApiResponse.error(res, 404, 'Testimonial not found');
    }
    return ApiResponse.success(res, 200, 'Testimonial updated successfully', { testimonial });
  } catch (error) {
    console.error('Update testimonial error:', error.message);
    return ApiResponse.error(res, 500, 'Server error updating testimonial');
  }
};

/**
 * @desc    Delete a testimonial
 * @route   DELETE /api/testimonials/:id
 * @access  Private (Admin only)
 */
const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return ApiResponse.error(res, 404, 'Testimonial not found');
    }
    return ApiResponse.success(res, 200, 'Testimonial deleted successfully');
  } catch (error) {
    console.error('Delete testimonial error:', error.message);
    return ApiResponse.error(res, 500, 'Server error deleting testimonial');
  }
};

module.exports = {
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
