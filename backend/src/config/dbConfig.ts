import mongoose from "mongoose";
import { logger } from "../utils/logger";
import config from "./config";

const { user, password, host, name } = config.db;
const mongoUri = `mongodb+srv://${user}:${password}@${host}/${name}`;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    logger.info("Connected to MongoDB");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
