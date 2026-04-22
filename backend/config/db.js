const mongoose = require("mongoose");
const logger = require("../utils/logger");

const connectDb = async () => {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not set");
  }

  try {
    await mongoose.connect(mongoUri);
    logger.info("MongoDB connected");
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDb;
