const SiteSetting = require('../models/SiteSetting');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Get site settings by group
 * @route   GET /api/site-settings/:group
 * @access  Public
 */
const getSettingsByGroup = async (req, res) => {
  try {
    const settings = await SiteSetting.find({ group: req.params.group });
    // Convert array to key-value object
    const result = settings.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});

    return ApiResponse.success(res, 200, 'Settings fetched successfully', { settings: result });
  } catch (error) {
    console.error('Get settings error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching settings');
  }
};

/**
 * @desc    Update site settings (bulk upsert)
 * @route   PUT /api/site-settings
 * @access  Private (Admin only)
 */
const updateSettings = async (req, res) => {
  try {
    const { settings } = req.body;

    if (!settings || !Array.isArray(settings)) {
      return ApiResponse.error(res, 400, 'Settings must be an array of { key, value, group }');
    }

    const operations = settings.map((item) => ({
      updateOne: {
        filter: { key: item.key },
        update: { $set: { value: item.value, group: item.group || 'general' } },
        upsert: true,
      },
    }));

    await SiteSetting.bulkWrite(operations);
    return ApiResponse.success(res, 200, 'Settings updated successfully');
  } catch (error) {
    console.error('Update settings error:', error.message);
    return ApiResponse.error(res, 500, 'Server error updating settings');
  }
};

module.exports = {
  getSettingsByGroup,
  updateSettings,
};
