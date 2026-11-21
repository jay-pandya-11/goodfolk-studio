const User = require('../models/User');
const ApiResponse = require('../utils/ApiResponse');
const generateToken = require('../utils/generateToken');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Private (Admin only)
 */
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return ApiResponse.error(res, 400, 'User with this email already exists');
    }

    // Create user — password hashing is handled by the model pre-save hook
    const user = await User.create({ name, email, password, role });

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user data (password is excluded by default via model toJSON)
    return ApiResponse.success(res, 201, 'User registered successfully', {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Register error:', error.message);
    return ApiResponse.error(res, 500, 'Server error during registration');
  }
};

/**
 * @desc    Login user & return token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email and explicitly select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return ApiResponse.error(res, 401, 'Invalid email or password');
    }

    // Verify password using the model instance method
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return ApiResponse.error(res, 401, 'Invalid email or password');
    }

    // Update lastLogin timestamp
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    // Generate JWT token
    const token = generateToken(user._id);

    // Return user data without the password
    return ApiResponse.success(res, 200, 'Login successful', {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        lastLogin: user.lastLogin,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error.message);
    return ApiResponse.error(res, 500, 'Server error during login');
  }
};

/**
 * @desc    Get current user's profile
 * @route   GET /api/auth/profile
 * @access  Private
 */
const getProfile = async (req, res) => {
  try {
    // req.user is already attached by the protect middleware
    return ApiResponse.success(res, 200, 'Profile fetched successfully', {
      user: req.user,
    });
  } catch (error) {
    console.error('Get profile error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching profile');
  }
};

/**
 * @desc    Change current user's password
 * @route   PUT /api/auth/change-password
 * @access  Private
 */
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Find user with password field selected
    const user = await User.findById(req.user.id).select('+password');
    if (!user) {
      return ApiResponse.error(res, 404, 'User not found');
    }

    // Verify current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return ApiResponse.error(res, 401, 'Current password is incorrect');
    }

    // Set new password — pre-save hook will hash it
    user.password = newPassword;
    await user.save();

    return ApiResponse.success(res, 200, 'Password changed successfully');
  } catch (error) {
    console.error('Change password error:', error.message);
    return ApiResponse.error(res, 500, 'Server error changing password');
  }
};

module.exports = {
  register,
  login,
  getProfile,
  changePassword,
};
