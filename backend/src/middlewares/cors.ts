import cors, { CorsOptions } from "cors";
import appConfig from "../config/config";

const whitelist = [appConfig.baseUrl, appConfig.clientUrl];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      const error = new Error("Not allowed by CORS") as Error & {
        name: string;
      };
      error.name = "CorsError";
      callback(error);
    }
  },
  // origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
};

// Export the configured CORS middleware
export const corsMiddleware = cors(corsOptions);
