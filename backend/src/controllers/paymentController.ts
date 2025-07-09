import { Request, Response, NextFunction } from "express";
import { PaymentService } from "../services/paymentService";
import { StripeService } from "../services/stripeService";

class PaymentController {
  async createStripeCheckout(req: Request, res: Response, next: NextFunction) {
    const userId = req.user!.id;
    const checkoutUrl = await PaymentService.createCheckoutSession(userId);
    res.status(200).json({ url: checkoutUrl });
  }

  async stripeWebhook(req: Request, res: Response) {
    const sig = req.headers["stripe-signature"] as string;

    try {
      const event = StripeService.verifyWebhookEvent(req.body, sig);
      await PaymentService.handleStripeEvent(event);
      res.json({ received: true });
    } catch (error) {
      if (error !== null && typeof error === "object" && "message" in error) {
        res.status(400).send(`Webhook Error: ${error.message}`);
        return;
      }
      res.status(400).send("Webhook Error");
    }
  }
}

export const paymentController = new PaymentController();
