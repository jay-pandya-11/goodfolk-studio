const mongoose = require('mongoose');

// ----- Testimonial Schema -----
const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Testimonial content is required'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    avatar: {
      type: String,
      default: '',
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
