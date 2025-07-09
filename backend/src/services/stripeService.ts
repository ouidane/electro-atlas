import { stripeClient, endpointSecret, Stripe } from "../config/stripe";
import { ProfileDoc, UserDoc } from "../models";
import { Types } from "mongoose";
import config from "../config/config";
import { logger } from "../utils/logger";
import { FormattedCartItemType } from "./cartService";

export class StripeService {
  // Creates or retrieves a Stripe customer for a user
  static async createCustomer(user: UserDoc): Promise<Stripe.Customer> {
    try {
      let customer = await stripeClient.customers
        .list({ email: user.email })
        .then((list) => list.data[0]);

      if (!customer) {
        customer = await stripeClient.customers.create({
          email: user.email,
          metadata: { userId: user._id.toString() },
        });
      }

      return customer;
    } catch (error) {
      logger.error("Error creating stripe customer", error);
      throw new Error("Error creating stripe customer");
    }
  }

  // Creates a Stripe checkout session
  static async createCheckoutSession(
    profile: ProfileDoc,
    cartId: string | Types.ObjectId,
    customer: Stripe.Customer,
    items: FormattedCartItemType[]
  ): Promise<Stripe.Checkout.Session> {
    const lineItems = this.createLineItems(items);
    const metadata = {
      profile: JSON.stringify(profile),
      cartId: cartId.toString(),
      userId: profile.userId.toString(),
    };
    const sessionOptions = this.createSessionOptions(
      customer.id,
      lineItems,
      metadata
    );

    const session = await stripeClient.checkout.sessions.create(sessionOptions);

    return session;
  }

  // Creates line items for a checkout session
  private static createLineItems(
    items: FormattedCartItemType[]
  ): Stripe.Checkout.SessionCreateParams.LineItem[] {
    return items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          images: item.product.image ? [item.product.image] : [],
          metadata: { id: item.product._id },
        },
        unit_amount: Math.round(
          item.product.variant.salePrice
            ? item.product.variant.salePrice
            : item.product.variant.globalPrice
        ),
      },
      quantity: Math.round(item.quantity),
    }));
  }

  // Creates session options for a checkout session
  private static createSessionOptions(
    customerId: string,
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    metadata: { [key: string]: string }
  ): Stripe.Checkout.SessionCreateParams {
    const origin = config.clientUrl || config.baseUrl;
    return {
      payment_method_types: ["card"],
      customer: customerId,
      line_items: lineItems,
      mode: "payment",
      metadata,
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout`,
    };
  }

  // Verifies and constructs a Stripe webhook event
  static verifyWebhookEvent(
    payload: string | Buffer,
    sig: string
  ): Stripe.Event {
    try {
      return stripeClient.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      throw new Error(`Error constructing event: ${error}`);
    }
  }

  // Retrieves line items from a checkout session
  static async getLineItemsFromSession(session: Stripe.Checkout.Session) {
    try {
      const lineItems = await stripeClient.checkout.sessions.listLineItems(
        session.id
      );
      return lineItems.data;
    } catch (error) {
      logger.error("Error fetching line items", error);
      throw new Error("Error fetching line items");
    }
  }
}
