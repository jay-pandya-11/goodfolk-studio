const Contact = require('../models/Contact');
const Service = require('../models/Service');
const Project = require('../models/Project');
const BlogPost = require('../models/BlogPost');
const Testimonial = require('../models/Testimonial');
const Newsletter = require('../models/Newsletter');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Get admin dashboard statistics
 * @route   GET /api/admin/dashboard
 * @access  Private (Admin only)
 */
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalContacts,
      newContacts,
      activeServices,
      publishedProjects,
      publishedPosts,
      publishedTestimonials,
      activeSubscribers,
      recentContacts,
      recentPosts,
    ] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
      Service.countDocuments({ isActive: true }),
      Project.countDocuments({ isPublished: true }),
      BlogPost.countDocuments({ isPublished: true }),
      Testimonial.countDocuments({ isPublished: true }),
      Newsletter.countDocuments({ isSubscribed: true }),
      Contact.find().sort({ createdAt: -1 }).limit(5).select('name email service status createdAt'),
      BlogPost.find().sort({ createdAt: -1 }).limit(5).select('title slug isPublished views createdAt'),
    ]);

    return ApiResponse.success(res, 200, 'Dashboard stats fetched successfully', {
      stats: {
        contacts: { total: totalContacts, new: newContacts },
        services: activeServices,
        projects: publishedProjects,
        blogPosts: publishedPosts,
        testimonials: publishedTestimonials,
        subscribers: activeSubscribers,
      },
      recentContacts,
      recentPosts,
    });
  } catch (error) {
    console.error('Dashboard stats error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching dashboard stats');
  }
};

module.exports = {
  getDashboardStats,
};
