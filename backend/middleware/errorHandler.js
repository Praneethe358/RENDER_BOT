const logger = require("../utils/logger");

const errorHandler = (err, _req, res, _next) => {
  logger.error(err.message || "Unexpected error");
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    message: err.message || "Internal server error"
  });
};

module.exports = errorHandler;
