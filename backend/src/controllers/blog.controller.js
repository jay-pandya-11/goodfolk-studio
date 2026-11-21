const BlogPost = require('../models/BlogPost');
const ApiResponse = require('../utils/ApiResponse');
const { getPagination, getPaginationData } = require('../utils/pagination');

/**
 * @desc    Get all published blog posts (paginated, filterable)
 * @route   GET /api/blog
 * @access  Public
 */
const getAllPosts = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const filter = { isPublished: true };

    if (req.query.category) filter.category = req.query.category;
    if (req.query.tag) filter.tags = { $in: [req.query.tag] };

    const [posts, total] = await Promise.all([
      BlogPost.find(filter)
        .populate('author', 'name avatar')
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit),
      BlogPost.countDocuments(filter),
    ]);

    return ApiResponse.success(res, 200, 'Blog posts fetched successfully', {
      posts,
      pagination: getPaginationData(total, page, limit),
    });
  } catch (error) {
    console.error('Get all posts error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching posts');
  }
};

/**
 * @desc    Get a single blog post by slug (increments views)
 * @route   GET /api/blog/:slug
 * @access  Public
 */
const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOneAndUpdate(
      { slug: req.params.slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    ).populate('author', 'name avatar');

    if (!post) {
      return ApiResponse.error(res, 404, 'Blog post not found');
    }
    return ApiResponse.success(res, 200, 'Blog post fetched successfully', { post });
  } catch (error) {
    console.error('Get post by slug error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching post');
  }
};

/**
 * @desc    Get published posts by category
 * @route   GET /api/blog/category/:category
 * @access  Public
 */
const getPostsByCategory = async (req, res) => {
  try {
    const { page, limit, skip } = getPagination(req.query);
    const filter = { isPublished: true, category: req.params.category };

    const [posts, total] = await Promise.all([
      BlogPost.find(filter)
        .populate('author', 'name avatar')
        .sort({ publishedAt: -1 })
        .skip(skip)
        .limit(limit),
      BlogPost.countDocuments(filter),
    ]);

    return ApiResponse.success(res, 200, 'Posts by category fetched successfully', {
      posts,
      pagination: getPaginationData(total, page, limit),
    });
  } catch (error) {
    console.error('Get posts by category error:', error.message);
    return ApiResponse.error(res, 500, 'Server error fetching posts by category');
  }
};

/**
 * @desc    Create a new blog post
 * @route   POST /api/blog
 * @access  Private (Admin only)
 */
const createPost = async (req, res) => {
  try {
    req.body.author = req.user.id;
    const post = await BlogPost.create(req.body);
    return ApiResponse.success(res, 201, 'Blog post created successfully', { post });
  } catch (error) {
    console.error('Create post error:', error.message);
    return ApiResponse.error(res, 500, 'Server error creating post');
  }
};

/**
 * @desc    Update a blog post
 * @route   PUT /api/blog/:id
 * @access  Private (Admin only)
 */
const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return ApiResponse.error(res, 404, 'Blog post not found');
    }

    Object.assign(post, req.body);
    await post.save();

    return ApiResponse.success(res, 200, 'Blog post updated successfully', { post });
  } catch (error) {
    console.error('Update post error:', error.message);
    return ApiResponse.error(res, 500, 'Server error updating post');
  }
};

/**
 * @desc    Delete a blog post
 * @route   DELETE /api/blog/:id
 * @access  Private (Admin only)
 */
const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) {
      return ApiResponse.error(res, 404, 'Blog post not found');
    }
    return ApiResponse.success(res, 200, 'Blog post deleted successfully');
  } catch (error) {
    console.error('Delete post error:', error.message);
    return ApiResponse.error(res, 500, 'Server error deleting post');
  }
};

module.exports = {
  getAllPosts,
  getPostBySlug,
  getPostsByCategory,
  createPost,
  updatePost,
  deletePost,
};
