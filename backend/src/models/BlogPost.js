const mongoose = require('mongoose');
const slugify = require('slugify');

// ----- BlogPost Schema -----
const blogPostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    coverImage: {
      type: String,
      default: '',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    tags: [{ type: String }],
    category: {
      type: String,
      trim: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ----- Pre-save hook: Auto-generate slug & set publishedAt -----
blogPostSchema.pre('save', function (next) {
  // Auto-generate slug from title if title is modified
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  // Set publishedAt when isPublished is changed to true and publishedAt is not already set
  if (this.isModified('isPublished') && this.isPublished && !this.publishedAt) {
    this.publishedAt = Date.now();
  }

  next();
});

module.exports = mongoose.model('BlogPost', blogPostSchema);
