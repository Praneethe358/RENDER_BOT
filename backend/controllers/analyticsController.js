const Log = require("../models/Log");
const Service = require("../models/Service");
const asyncHandler = require("../utils/asyncHandler");

const getServiceAnalytics = asyncHandler(async (req, res) => {
  const { serviceId } = req.params;
  const service = await Service.findById(serviceId);

  if (!service) {
    return res.status(404).json({ message: "Service not found" });
  }

  const logs = await Log.find({ serviceId })
    .sort({ timestamp: -1 })
    .limit(120);

  const total = logs.length;
  const upCount = logs.filter((log) => log.status === "UP").length;
  const uptimePercentage = total === 0 ? 0 : Math.round((upCount / total) * 1000) / 10;

  const series = logs
    .map((log) => ({
      timestamp: log.timestamp,
      status: log.status,
      responseTime: log.responseTime
    }))
    .reverse();

  res.json({
    service: {
      id: service._id,
      name: service.name,
      url: service.url
    },
    uptimePercentage,
    totalChecks: total,
    series
  });
});

module.exports = { getServiceAnalytics };
