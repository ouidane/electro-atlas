import express from "express";
import config from "./config/config";
import { logger } from "./utils/logger";
import connectDB from "./config/dbConfig";
import configureServer from "./server";
import { flushLogsAndExit } from "./utils/gracefulShutdown";

const app = express();

// Configure middlewares, routes, etc.
configureServer(app);

// Connect to DB and start the server
const start = async () => {
  try {
    await connectDB();

    const { nodeEnv, port } = config;

    app.listen(port, () => {
      logger.info(`Running in ${nodeEnv} mode on port ${port}`);
    });
  } catch (err) {
    logger.error("Error starting application", {
      message: (err as Error).message,
      stack: (err as Error).stack,
    });
    await flushLogsAndExit(1);
  }
};

start();

// Graceful shutdown and error handlers
process.on("SIGINT", async () => {
  logger.info("Process received SIGINT. Exiting gracefully...");
  await flushLogsAndExit(0);
});

process.on("SIGTERM", async () => {
  logger.info("Process received SIGTERM. Exiting gracefully...");
  await flushLogsAndExit(0);
});

process.on("uncaughtException", async (err: Error) => {
  logger.error("Uncaught Exception", {
    message: err.message,
    stack: err.stack,
    name: err.name,
  });
  await flushLogsAndExit(1);
});

process.on("unhandledRejection", async (reason: unknown) => {
  logger.error("Unhandled Rejection", {
    reason: reason instanceof Error ? reason.message : String(reason),
    ...(reason instanceof Error && { stack: reason.stack }),
  });
  await flushLogsAndExit(1);
});
