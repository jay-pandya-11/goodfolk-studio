const ApiResponse = require('../utils/ApiResponse');

// ----- Admin-only access: Restrict route to admin users -----
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return ApiResponse.error(
      res,
      403,
      'Access denied. Admin privileges required'
    );
  }

  next();
};

module.exports = { adminOnly };
