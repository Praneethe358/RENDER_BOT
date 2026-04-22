require("dotenv").config();

const express = require("express");
const connectDb = require("./config/db");
const serviceRoutes = require("./routes/serviceRoutes");
const healthRoutes = require("./routes/healthRoutes");
const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./middleware/rateLimiter");
const { startPinger } = require("./services/pingerService");
const logger = require("./utils/logger");

const app = express();

app.use(express.json());
app.use(rateLimiter);

app.use("/api/services", serviceRoutes);
app.use("/health", healthRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDb();
  startPinger();
  app.listen(PORT, () => {
    logger.info(`PulseKeep backend running on port ${PORT}`);
  });
};

startServer();
