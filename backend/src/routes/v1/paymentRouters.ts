import express, { Router } from "express";
import { permit, requireAuth } from "../../middlewares";
import { paymentController } from "../../controllers/paymentController";
import { ROLE } from "../../utils/constants";

export const router: Router = express.Router();

/**
 * @openapi
 * /payments/checkout:
 *   post:
 *     summary: Create a checkout session
 *     operationId: createCheckoutSession
 *     tags:
 *       - payment
 *     security:
 *       - AccessTokenAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCheckoutSessionResponse'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '409':
 *         $ref: '#/components/responses/ConflictError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
  "/checkout",
  requireAuth,
  permit(ROLE.BUYER, ROLE.ADMIN),
  paymentController.createStripeCheckout,
);

router.post("/webhook", paymentController.stripeWebhook);
