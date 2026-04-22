const cron = require("node-cron");
const axios = require("axios");
const Service = require("../models/Service");
const Log = require("../models/Log");
const logger = require("../utils/logger");

const REQUEST_TIMEOUT_MS = 5000;
let isRunning = false;

const isDue = (service, now) => {
  if (!service.lastPing) {
    return true;
  }

  const diffMs = now.getTime() - service.lastPing.getTime();
  const diffMinutes = diffMs / 60000;
  return diffMinutes >= service.interval;
};

const attemptPing = async (service) => {
  const startTime = Date.now();
  const response = await axios.get(service.url, {
    timeout: REQUEST_TIMEOUT_MS,
    validateStatus: () => true
  });
  const responseTime = Date.now() - startTime;
  const isUp = response.status >= 200 && response.status < 400;

  return { status: isUp ? "UP" : "DOWN", responseTime };
};

const pingService = async (service) => {
  let result = null;

  try {
    result = await attemptPing(service);
    if (result.status === "DOWN") {
      result = await attemptPing(service);
    }
  } catch (error) {
    logger.warn(`Ping failed for ${service.url}: ${error.message}`);
    try {
      result = await attemptPing(service);
    } catch (retryError) {
      logger.warn(`Retry failed for ${service.url}: ${retryError.message}`);
      result = { status: "DOWN", responseTime: null };
    }
  }

  const { status, responseTime } = result;
  service.status = status;
  service.lastPing = new Date();
  service.responseTime = responseTime;

  await Promise.all([
    service.save(),
    Log.create({
      serviceId: service._id,
      status,
      responseTime,
      timestamp: new Date()
    })
  ]);
};

const startPinger = () => {
  cron.schedule("* * * * *", async () => {
    if (isRunning) {
      return;
    }

    isRunning = true;
    const now = new Date();

    try {
      const services = await Service.find();
      const dueServices = services.filter((service) => isDue(service, now));

      if (dueServices.length > 0) {
        await Promise.all(dueServices.map((service) => pingService(service)));
      }
    } catch (error) {
      logger.error(`Pinger loop error: ${error.message}`);
    } finally {
      isRunning = false;
    }
  });
};

module.exports = { startPinger };
