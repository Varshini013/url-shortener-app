const fs = require('fs');
const path = require('path');

const logger = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.originalUrl}\n`;
  fs.appendFileSync(path.join(__dirname, '../log.txt'), log);
  next();
};

module.exports = logger;
