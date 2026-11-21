/**
 * app.js — Express application configuration
 *
 * Sets up middleware, mounts route modules, and applies
 * the global error handler. Exported for use in server.js.
 */
const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Import route modules
const authRoutes = require('./routes/auth.routes');
const contactRoutes = require('./routes/contact.routes');
const serviceRoutes = require('./routes/service.routes');
const projectRoutes = require('./routes/project.routes');
const blogRoutes = require('./routes/blog.routes');
const testimonialRoutes = require('./routes/testimonial.routes');
const newsletterRoutes = require('./routes/newsletter.routes');
const siteSettingRoutes = require('./routes/siteSetting.routes');
const uploadRoutes = require('./routes/upload.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

// Import error handler middleware
const { errorHandler } = require('./middleware/error.middleware');

// ─── Create Express app ───────────────────────────────────────
const app = express();

// ─── Security headers ─────────────────────────────────────────
app.use(helmet());

// ─── CORS ─────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// ─── Body parsers ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── HTTP request logger (dev only) ───────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Static files — serve uploaded assets ─────────────────────
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ─── API routes ───────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/site-settings', siteSettingRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin/dashboard', dashboardRoutes);

// ─── Health check ─────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  const databaseConnected = mongoose.connection.readyState === 1;

  res.status(databaseConnected ? 200 : 503).json({
    success: databaseConnected,
    message: databaseConnected
      ? 'Goodfolk Studio API and database are running'
      : 'Goodfolk Studio API is running, but the database is unavailable',
    database: databaseConnected ? 'connected' : 'disconnected',
  });
});

// ─── Global error handler (must be LAST) ──────────────────────
app.use(errorHandler);

module.exports = app;
