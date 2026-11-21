const mongoose = require('mongoose');
const slugify = require('slugify');

// ----- Service Schema -----
const serviceSchema = new mongoose.Schema(
  {
    number: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    tag: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    icon: {
      type: String,
      default: 'FaCode',
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    deliverables: [{ type: String }],
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// ----- Pre-save hook: Auto-generate slug from title -----
serviceSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model('Service', serviceSchema);
