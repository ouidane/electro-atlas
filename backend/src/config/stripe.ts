import stripe from "stripe";
import config from "./config";

export const stripeClient = new stripe(config.stripe.secretKey);
export const endpointSecret = config.stripe.endpointSecret;
export { Stripe } from "stripe";
