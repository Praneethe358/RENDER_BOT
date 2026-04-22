require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const serviceRoutes = require("./routes/serviceRoutes");
const healthRoutes = require("./routes/healthRoutes");
const logRoutes = require("./routes/logRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const errorHandler = require("./middleware/errorHandler");
const rateLimiter = require("./middleware/rateLimiter");
const { startPinger } = require("./services/pingerService");
const logger = require("./utils/logger");

const app = express();

app.use(express.json());
app.use(cors());
app.use(rateLimiter);

app.use("/api/services", serviceRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/health", healthRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDb();
  startPinger();
  app.listen(PORT, () => {
    logger.info(`StayLive backend running on port ${PORT}`);
  });
};

startServer();
