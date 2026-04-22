const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDb = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    logger.error("MONGODB_URI is not set");
    throw new Error("MONGODB_URI is not set");
  }

  try {
    logger.info(`Connecting to MongoDB: ${mongoUri.substring(0, 50)}...`);
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    logger.error(`Full error: ${error}`);
    // Don't exit, just log and let the app continue
    // This allows the health check to work even if DB is down
    logger.warn("App will continue running, but database operations may fail");
  }
};

module.exports = connectDb;
