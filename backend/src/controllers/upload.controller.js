const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Upload a single image
 * @route   POST /api/upload/image
 * @access  Private (Admin only)
 */
const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return ApiResponse.error(res, 400, 'No image file provided');
    }
    const url = `/uploads/${req.file.filename}`;
    return ApiResponse.success(res, 200, 'Image uploaded successfully', { url });
  } catch (error) {
    console.error('Upload image error:', error.message);
    return ApiResponse.error(res, 500, 'Server error uploading image');
  }
};

/**
 * @desc    Upload multiple images
 * @route   POST /api/upload/images
 * @access  Private (Admin only)
 */
const uploadImages = (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return ApiResponse.error(res, 400, 'No image files provided');
    }
    const urls = req.files.map((file) => `/uploads/${file.filename}`);
    return ApiResponse.success(res, 200, 'Images uploaded successfully', { urls });
  } catch (error) {
    console.error('Upload images error:', error.message);
    return ApiResponse.error(res, 500, 'Server error uploading images');
  }
};

module.exports = {
  uploadImage,
  uploadImages,
};
