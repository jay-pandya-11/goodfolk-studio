const Newsletter = require('../models/Newsletter');
const ApiResponse = require('../utils/ApiResponse');
const { getPagination, getPaginationData } = require('../utils/pagination');

/**
 * @desc    Subscribe to newsletter
 * @route   POST /api/newsletter/subscribe
 * @access  Public
 */
const subscribe = async (req, res) => {
  try {
    const { email, name } = req.body;
    const existing = await Newsletter.findOne({ email });

    if (existing) {
      if (existing.isSubscribed) {
        return ApiResponse.error(res, 400, 'This email is already subscribed');
      }
      // Resubscribe
      existing.isSubscribed = true;
      existing.subscribedAt = Date.now();
      existing.unsubscribedAt = null;
      if (name) existing.name = name;
      await existing.save();
      return ApiResponse.success(res, 200, 'Successfully resubscribed', { subscriber: existing });
    }

    const subscriber = await Newsletter.create({ email, name });
    return ApiResponse.success(res, 201, 'Successfully subscribed to newsletter', { subscriber });
  } catch (error) {
    console.error('Subscribe error:', error.message);
    return ApiResponse.error(res, 500, 'Server error subscribing');
  }
};

/**
 * @desc    Unsubscribe from newsletter
 * @route   POST /api/newsletter/unsubscribe
 * @access  Public
 */
const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;
    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return ApiResponse.error(res, 404, 'Email not found in subscriber list');
    }

    subscriber.isSubscribed = false;
    subscriber.unsubscribedAt = Date.now();
    await subscriber.save();

    return ApiResponse.success(res, 200, 'Successfully unsubscribed');
  } catch (error) {
    console.error('Unsubscribe error:', error.message);
    return ApiResponse.error(res, 500, 'Server error unsubscribing');
  }
};

/**
 * @desc    Get all newsletter subscribers (admin)
 * @route   GET /api/newsletter/subscribers
 * @access  Private (Admin only)
 */
const getAllSubscribers = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const filter = {};
    if (req.query.isSubscribed !== undefined) {
      filter.isSubscribed = req.query.isSubscribed === 'true';
    }

    const [subscribers, total] = await Promise.all([
      Newsletter.find(filter).sort({ subscribedAt: -1 }).skip(skip).limit(limit),
      Newsletter.countDocuments(filter),
    ]);

    return ApiResponse.success(res, 200, 'Subscribers fetched successfully', {
      subscribers,
      pagination: getPaginationData(total, page, limit),
    });
  } catch (error) {
    console.error('Get all subscribers error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching subscribers');
  }
};

module.exports = {
  subscribe,
  unsubscribe,
  getAllSubscribers,
};
