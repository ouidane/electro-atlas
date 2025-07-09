import { createClient } from "redis";
import { logger } from "../utils/logger";
import config from "./config";

const { username, password, host, port } = config.redis;

const client = createClient({
  username,
  password,
  socket: { host, port: Number(port) },
});

client.on("error", (err) => logger.error(`Redis Client Error: ${err.message}`));
client.connect();

export default client;
