import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import config from "../config/config";

const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }),
  winston.format.printf(
    ({ timestamp, level, message, logMetadata, stack }) =>
      `${timestamp} ${level}: ${logMetadata || ""} ${message} ${stack || ""}`,
  ),
);

const fileFormat = winston.format.combine(
  winston.format.errors({ stack: true }),
  winston.format.timestamp(),
  winston.format.json(),
);

const logger = winston.createLogger({
  level: config.logLevel,
  format: fileFormat,
  transports: [
    new winston.transports.Console({
      format: config.isProd ? fileFormat : consoleFormat,
    }),
  ],
});

const fileRotateTransport = new DailyRotateFile({
  filename: "logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
  format: fileFormat,
});

logger.add(fileRotateTransport);

export { logger };
