/**
 * env.js — Centralized environment configuration
 *
 * Reads all required environment variables and provides
 * sensible defaults so the app can start in development
 * without a fully populated .env file.
 */
module.exports = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // MongoDB
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/goodfolk-studio',

  // JWT
  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',

  // Email (SMTP / Nodemailer)
  SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
  SMTP_PORT: process.env.SMTP_PORT || 587,
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  EMAIL_FROM: process.env.EMAIL_FROM || 'noreply@goodfolkstudio.com',

  // Frontend URL (CORS origin)
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',

  // Upload limits (bytes)
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE, 10) || 5242880, // 5 MB
};
