const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiResponse = require('../utils/ApiResponse');

// ----- Protect routes: Verify JWT and attach user to request -----
const protect = async (req, res, next) => {
  try {
    let token;

    // Extract token from Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    // No token provided
    if (!token) {
      return ApiResponse.error(res, 401, 'Not authorized, no token provided');
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by decoded id, exclude password
    const user = await User.findById(decoded.id).select('-password');

    // User not found or inactive
    if (!user) {
      return ApiResponse.error(res, 401, 'Not authorized, user not found');
    }

    if (!user.isActive) {
      return ApiResponse.error(
        res,
        401,
        'Not authorized, account is deactivated'
      );
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    // Handle JWT-specific errors (expired, malformed, etc.)
    return ApiResponse.error(
      res,
      401,
      'Not authorized, token invalid or expired'
    );
  }
};

module.exports = { protect };
