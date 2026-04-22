const fs = require("fs");
const path = require("path");

const shouldLogToFile = process.env.LOG_TO_FILE === "true";
const logFilePath = process.env.LOG_FILE_PATH || "./logs/app.log";

const writeToFile = async (line) => {
  if (!shouldLogToFile) {
    return;
  }

  const fullPath = path.resolve(logFilePath);
  await fs.promises.mkdir(path.dirname(fullPath), { recursive: true });
  await fs.promises.appendFile(fullPath, line);
};

const formatLine = (level, message) => {
  const timestamp = new Date().toISOString();
  return `${timestamp} [${level}] ${message}\n`;
};

const log = (level, message) => {
  const line = formatLine(level, message);
  if (level === "ERROR") {
    console.error(line.trim());
  } else if (level === "WARN") {
    console.warn(line.trim());
  } else {
    console.log(line.trim());
  }

  writeToFile(line).catch((error) => {
    console.error(`Logger write error: ${error.message}`);
  });
};

module.exports = {
  info: (message) => log("INFO", message),
  warn: (message) => log("WARN", message),
  error: (message) => log("ERROR", message)
};
