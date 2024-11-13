/*const winston = require("winston");
require("dotenv").config();
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.simple(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message} ${method}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "application.log" }),
  ],
});

module.exports = logger;*/
const winston = require("winston");
const { LOG_LEVEL } = require("./config");

const logger = winston.createLogger({
  level: LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, method, url }) => {
      // Lägg till metod och URL om de finns i loggen
      if (method && url) {
        return `${timestamp} [${level}]: ${method} ${url} - ${message}`;
      }
      return `${timestamp} [${level}]: ${message}`;
    })
  ),

  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({ filename: "log/combine.log" }),
  ],
});

module.exports = logger;
