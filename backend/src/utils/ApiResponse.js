/**
 * ApiResponse — Standardized API response utility
 *
 * Provides consistent JSON response format across all endpoints.
 * Every controller should use these static methods instead of
 * calling res.json() directly.
 */
class ApiResponse {
  /**
   * Send a success response
   * @param {Object} res - Express response object
   * @param {number} statusCode - HTTP status code (default: 200)
   * @param {string} message - Success message
   * @param {*} data - Response payload (omitted if null)
   */
  static success(res, statusCode = 200, message = 'Success', data = null) {
    const response = { success: true, message };
    if (data !== null) response.data = data;
    return res.status(statusCode).json(response);
  }

  /**
   * Send an error response
   * @param {Object} res - Express response object
   * @param {number} statusCode - HTTP status code (default: 500)
   * @param {string} message - Error message
   * @param {*} errors - Detailed error info (omitted if null)
   */
  static error(res, statusCode = 500, message = 'Server Error', errors = null) {
    const response = { success: false, message };
    if (errors !== null) response.errors = errors;
    return res.status(statusCode).json(response);
  }
}

module.exports = ApiResponse;
