const Log = require("../models/Log");
const asyncHandler = require("../utils/asyncHandler");

const getLogs = asyncHandler(async (req, res) => {
  const logs = await Log.find({ userId: req.user.id })
    .populate("serviceId", "name")
    .sort({ timestamp: -1 })
    .limit(500);

  const response = logs.map((log) => ({
    _id: log._id,
    serviceId: log.serviceId?._id,
    serviceName: log.serviceId?.name,
    status: log.status,
    responseTime: log.responseTime,
    timestamp: log.timestamp
  }));

  res.json(response);
});

module.exports = { getLogs };
