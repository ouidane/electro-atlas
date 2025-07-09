import { logger } from "./logger";
import mongoose from "mongoose";
import winston from "winston";

export const flushLogsAndExit = async (code: number = 1): Promise<void> => {
  try {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.close();

      await new Promise<void>((resolve, reject) => {
        logger.info("MongoDB connection closed", (err: unknown) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          err ? reject(err) : resolve();
        });
      });
    }

    // Close and flush all logger transports
    await new Promise<void>((resolve) => {
      logger.once("finish", resolve);

      // Manually close file transports
      logger.transports.forEach((transport) => {
        if (transport instanceof winston.transports.File) {
          if (typeof transport.close === "function") {
            transport.close();
          }
        }
      });

      logger.end();
    });

    process.exit(code);
  } catch (err) {
    logger.error("Error during shutdown", err);
    process.exit(code);
  }
};
