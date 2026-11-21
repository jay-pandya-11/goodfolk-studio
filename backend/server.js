/**
 * server.js — Application entry point
 *
 * Loads environment variables, starts the Express HTTP server,
 * and connects to MongoDB.
 */
require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/db');

const PORT = process.env.PORT || 5000;

// Start Express server immediately
const server = app.listen(PORT, () => {
  console.log(`🚀 Goodfolk Studio API running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
  console.log(`📡 Health check available at: http://localhost:${PORT}/api/health`);
});

// Connect to MongoDB
connectDB();

// Handle unhandled promise rejections gracefully
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
});
