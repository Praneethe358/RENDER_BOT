const rateLimit = require("express-rate-limit");

const windowMinutes = Number(process.env.RATE_LIMIT_WINDOW_MINUTES) || 15;
const maxRequests = Number(process.env.RATE_LIMIT_MAX) || (process.env.NODE_ENV === "development" ? 1000 : 100);

const isLocalhost = (req) => {
  const ip = req.ip || "";
  const host = req.headers.host || "";
  return (
    ip.includes("127.0.0.1") ||
    ip.includes("::1") ||
    ip.includes("::ffff:127.0.0.1") ||
    host.includes("localhost") ||
    host.includes("127.0.0.1")
  );
};

const rateLimiter = rateLimit({
  windowMs: windowMinutes * 60 * 1000,
  max: maxRequests,
  skip: (req) => isLocalhost(req),
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = rateLimiter;
