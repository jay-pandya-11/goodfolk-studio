/**
 * pagination — Query pagination helpers
 *
 * Extracts page/limit from request query params and builds
 * a pagination metadata object for list endpoints.
 */

/**
 * Extract pagination parameters from a query object
 * @param {Object} query - Express req.query object
 * @returns {{ page: number, limit: number, skip: number }}
 */
const getPagination = (query) => {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.max(parseInt(query.limit, 10) || 10, 1);
  const skip = (page - 1) * limit;

  return { page, limit, skip };
};

/**
 * Build pagination metadata for a response
 * @param {number} total - Total number of documents
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @returns {Object} Pagination metadata
 */
const getPaginationData = (total, page, limit) => {
  const totalPages = Math.ceil(total / limit);

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
};

module.exports = { getPagination, getPaginationData };
