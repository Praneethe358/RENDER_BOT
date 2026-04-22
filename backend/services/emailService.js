const nodemailer = require("nodemailer");
const logger = require("../utils/logger");

const buildTransport = () => {
  const host = process.env.EMAIL_HOST;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const port = Number(process.env.EMAIL_PORT || 587);

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });
};

const sendAlert = async ({ to, subject, html }) => {
  const transport = buildTransport();
  if (!transport) {
    logger.warn("Email transport not configured, skipping alert");
    return;
  }

  const from = process.env.EMAIL_FROM || "PulseKeep <no-reply@pulsekeep.local>";

  await transport.sendMail({
    from,
    to,
    subject,
    html
  });
};

module.exports = { sendAlert };
