/**
 * db.js — MongoDB connection handler
 *
 * Establishes the Mongoose connection to MongoDB.
 * Called once at server startup from server.js.
 */
const mongoose = require('mongoose');

/**
 * Connect to MongoDB using the URI from environment variables
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.warn(`⚠️  MongoDB Connection Warning: ${error.message}`);
    console.warn(`👉 The API server will continue running, but database operations will wait until MongoDB is reachable.`);
    return null;
  }
};

module.exports = connectDB;
