import { PAYMENT_METHOD, PAYMENT_STATUS } from "../utils/constants";
import { InventoryService } from "./inventoryService";
import { DeliveryService } from "./deliveryService";
import { OrderService } from "./orderService";
import { CartService } from "./cartService";
import { EmailService } from "./emailService";
import { UserService } from "./userService";
import { Payment } from "../models";
import createError from "http-errors";
import { StripeService } from "./stripeService";
import { Stripe } from "../config/stripe";

export class PaymentService {
  static async createCheckoutSession(userId: string) {
    const user = await UserService.getUserById(userId);
    if (!user.profile || !user.profile.address) {
      throw createError(404, "Profile not found");
    }

    const cart = await CartService.getCartByUserId(userId);
    await InventoryService.checkStock(cart.cartItems);

    const customer = await StripeService.createCustomer(user);
    const session = await StripeService.createCheckoutSession(
      user.profile,
      cart._id as string,
      customer,
      cart.cartItems
    );

    return session.url;
  }

  static async handleStripeEvent(event: Stripe.Event) {
    switch (event.type) {
      case "checkout.session.completed":
        await this.handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session
        );
        break;
      // ... handle other event types
    }
  }

  private static async handleCheckoutSessionCompleted(
    session: Stripe.Checkout.Session
  ) {
    const email = session.customer_details?.email;
    const cartId = session.metadata?.cartId;
    const profileRaw = session.metadata?.profile;

    if (!email || !cartId || !profileRaw) {
      throw new Error("Missing required session data");
    }

    const profile = JSON.parse(profileRaw);

    const paymentId = await this.createPayment(
      session,
      PAYMENT_STATUS.COMPLETED
    );
    const order = await OrderService.createOrder({ session, paymentId });
    const delivery = await DeliveryService.createDelivery(profile, order._id);

    await InventoryService.updateInventory(order._id);

    await Promise.all([
      CartService.clearCartById(cartId),
      CartService.handleOutOfStockProduct(order, cartId),
      EmailService.sendOrderConfirmationEmail({
        order,
        delivery,
        email,
      }),
    ]);
  }

  private static async createPayment(
    session: Stripe.Checkout.Session,
    status: string
  ) {
    const payment = await Payment.create({
      amountTotal: session.amount_total,
      paymentStatus: status,
      paymentMethod: PAYMENT_METHOD.CARD,
      customerId: session.customer,
      userId: session.metadata!.userId,
      transactionId: session.payment_intent,
    });

    return payment._id;
  }
}
