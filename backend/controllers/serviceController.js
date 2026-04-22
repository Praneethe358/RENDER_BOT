const Service = require("../models/Service");
const { isValidUrl } = require("../utils/validators");
const asyncHandler = require("../utils/asyncHandler");

const addService = asyncHandler(async (req, res) => {
  const { name, url, interval } = req.body;

  if (!name || !url) {
    return res.status(400).json({ message: "Name and URL are required" });
  }

  if (!isValidUrl(url)) {
    return res.status(400).json({ message: "Invalid URL format" });
  }

  const requestedInterval = interval ?? 10;
  if (requestedInterval < 5) {
    return res.status(400).json({ message: "Interval must be at least 5 minutes" });
  }

  const existing = await Service.findOne({ url });
  if (existing) {
    return res.status(409).json({ message: "Service URL already exists" });
  }

  const service = await Service.create({
    name,
    url,
    interval: requestedInterval
  });

  res.status(201).json(service);
});

const getServices = asyncHandler(async (_req, res) => {
  const services = await Service.find().sort({ createdAt: -1 });
  res.json(services);
});

const deleteService = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await Service.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ message: "Service not found" });
  }

  res.json({ message: "Service deleted" });
});

module.exports = {
  addService,
  getServices,
  deleteService
};
