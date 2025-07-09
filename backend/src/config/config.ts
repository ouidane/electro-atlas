import dotenv from "dotenv";
dotenv.config();

export default {
  nodeEnv: process.env.NODE_ENV, // Node environment (dev, prod)
  port: process.env.PORT || 5000, // Server port
  clientUrl: process.env.CLIENT_URL || "", // Client URL for CORS
  baseUrl: process.env.BASE_URL || "", // Base URL for the application
  debug: process.env.DEBUG === "true", // Debug mode
  isProd: process.env.NODE_ENV === "production", // Is production environment
  logLevel: process.env.LOG_LEVEL || "debug", // Logging level
  stripe: {
    endpointSecret: process.env.STRIPE_ENDPOINT_SECRET || "", // Stripe webhook endpoint secret
    secretKey: process.env.STRIPE_KEY || "", // Stripe API key
  },
  auth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "", // Google OAuth client ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "", // Google OAuth client secret
      callbackURL: `${process.env.BASE_URL}/api/v1/auth/google/callback`, // Google OAuth callback URL
    },
  },
  jwt: {
    secretKey: process.env.JWT_SECRET_KEY || "", // JWT secret key
    accessTokenSecret: process.env.JWT_ACCESS_SECRET || "", // JWT access token secret
    refreshTokenSecret: process.env.JWT_REFRESH_SECRET || "", // JWT refresh token secret
  },
  redis: {
    host: process.env.REDIS_HOST || "", // Redis host
    port: process.env.REDIS_PORT || "", // Redis port
    username: process.env.REDIS_USERNAME || "", // Redis user
    password: process.env.REDIS_PASSWORD || "", // Redis password
  },
  db: {
    user: process.env.DB_USER || "", // Database user
    password: process.env.DB_PASSWORD || "", // Database password
    host: process.env.DB_HOST || "", // Database host
    name: process.env.DB_NAME || "", // Database name
  },
  cloudinary: {
    cloudName: process.env.CLOUD_NAME || "", // Cloudinary cloud name
    apiKey: process.env.API_KEY || "", // Cloudinary API key
    apiSecret: process.env.API_SECRET || "", // Cloudinary API secret
  },
  mail: {
    host: process.env.MAIL_HOST || "", // Mail host
    port: process.env.MAIL_PORT || "", // Mail port
    user: process.env.MAIL_USER || "", // Mail user
    pass: process.env.MAIL_PASSWORD || "", // Mail password
  },
};
