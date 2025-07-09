import express from "express";
import {
  requireAuth,
  permit,
  validateGetOrdersQuery,
  validateUpdateOrderStatus,
} from "../../middlewares";
import { orderController } from "../../controllers/orderController";
import { ROLE } from "../../utils/constants";

export const router = express.Router();

/**
 * @openapi
 * /orders:
 *   get:
 *     summary: Get all orders (admin only)
 *     operationId: getAllOrders
 *     tags:
 *       - order
 *     security:
 *       - AccessTokenAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetOrdersResponse'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/",
  requireAuth,
  permit(ROLE.ADMIN),
  validateGetOrdersQuery,
  orderController.getOrders
);

/**
 * @openapi
 * /orders/{orderId}:
 *   get:
 *     summary: Get order by id (admin only)
 *     operationId: getOrderById
 *     tags:
 *       - order
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/OrderId'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetOrderResponse'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/:orderId",
  requireAuth,
  permit(ROLE.ADMIN),
  orderController.getOrderById
);

/**
 * @openapi
 * /orders/{orderId}:
 *   patch:
 *     summary: Update order status by id (admin only)
 *     operationId: updateOrderStatus
 *     tags:
 *       - order
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/OrderId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/UpdateOrderStatus'
 *     responses:
 *       '204':
 *         description: Order status updated successfully
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.patch(
  "/:orderId",
  requireAuth,
  permit(ROLE.ADMIN),
  validateUpdateOrderStatus,
  orderController.updateOrderStatus
);
