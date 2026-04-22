const cron = require("node-cron");
const axios = require("axios");
const Service = require("../models/Service");
const Log = require("../models/Log");
const logger = require("../utils/logger");
const { sendAlert } = require("./emailService");

const REQUEST_TIMEOUT_MS = 5000;
let isRunning = false;
const activePings = new Set();

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

const pingWithRetries = async (service, maxRetries = 2) => {
  let attempt = 0;
  let lastError = null;
  let lastResult = null;

  while (attempt <= maxRetries) {
    try {
      lastResult = await attemptPing(service);
      if (lastResult.status === "UP") {
        return lastResult;
      }

      attempt += 1;
      if (attempt <= maxRetries) {
        logger.warn(`Ping returned DOWN for ${service.url}, retrying (${attempt}/${maxRetries})`);
      }
    } catch (error) {
      lastError = error;
      attempt += 1;
      logger.warn(`Ping attempt ${attempt} failed for ${service.url}: ${error.message}`);
    }
  }

  if (lastError) {
    logger.warn(`All retries failed for ${service.url}: ${lastError.message}`);
  }

  return lastResult || { status: "DOWN", responseTime: null };
};

const pingService = async (service) => {
  const serviceId = service._id.toString();
  if (activePings.has(serviceId)) {
    return;
  }

  activePings.add(serviceId);
  const previousStatus = service.status;

  try {
    const result = await pingWithRetries(service, 2);
    const { status, responseTime } = result;

    service.status = status;
    service.lastPing = new Date();
    service.responseTime = responseTime;

    await Promise.all([
      service.save(),
      Log.create({
        userId: service.userId?._id || service.userId,
        serviceId: service._id,
        status,
        responseTime,
        timestamp: new Date()
      })
    ]);

    if (previousStatus !== status && service.userId?.email) {
      const subject =
        status === "DOWN"
          ? `StayLive alert: ${service.name} is DOWN`
          : `StayLive recovery: ${service.name} is UP`;
      const html = `
        <p>Hello,</p>
        <p>Your service <strong>${service.name}</strong> (${service.url}) is now <strong>${status}</strong>.</p>
        <p>Response time: ${responseTime ?? "-"} ms</p>
        <p>StayLive will continue monitoring and alert on changes.</p>
      `;

      await sendAlert({
        to: service.userId.email,
        subject,
        html
      });
    }
  } catch (error) {
    logger.error(`Ping workflow error for ${service.url}: ${error.message}`);
  } finally {
    activePings.delete(serviceId);
  }
};

const startPinger = () => {
  cron.schedule("* * * * *", async () => {
    if (isRunning) {
      return;
    }

    isRunning = true;
    const now = new Date();

    try {
      const services = await Service.find().populate("userId", "email");
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
