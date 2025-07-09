import { v2 as cloudinary } from "cloudinary";
import config from "./config";

const { cloudName, apiKey, apiSecret } = config.cloudinary;

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export default cloudinary;
