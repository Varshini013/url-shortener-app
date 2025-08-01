// backend/middleware/logger.js

const fs = require("fs");
const path = require("path");

const logFilePath = path.join(__dirname, "../log.txt");

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${req.method} ${req.originalUrl} from ${req.ip}\n`;

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error("Logging error:", err);
    }
  });

  next();
};

module.exports = logger;
