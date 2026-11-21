/**
 * slugify — URL-friendly slug generator
 *
 * Converts a human-readable title into a lowercase,
 * hyphen-separated slug suitable for URLs.
 */
const slugify = require('slugify');

/**
 * Create a URL-safe slug from text
 * @param {string} text - The string to slugify (e.g. a title)
 * @returns {string} Lowercase slug with strict character filtering
 */
const createSlug = (text) => {
  return slugify(text, { lower: true, strict: true });
};

module.exports = createSlug;
