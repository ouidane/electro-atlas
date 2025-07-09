import express from "express";
import {
  requireAuth,
  permit,
  validateUpdateRefund,
  validateGetSalesQuery,
} from "../../middlewares";
import { saleController } from "../../controllers/saleController";
import { ROLE } from "../../utils/constants";

export const router = express.Router();

/**
 * @openapi
 * /sales:
 *   get:
 *     summary: Get all sales (admin only)
 *     operationId: getAllSales
 *     tags:
 *       - sale
 *     security:
 *       - AccessTokenAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetSalesResponse'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/",
  requireAuth,
  permit(ROLE.ADMIN),
  validateGetSalesQuery,
  saleController.getSales,
);

/**
 * @openapi
 * /sales/{saleId}:
 *   get:
 *     summary: Get sale by id (admin only)
 *     operationId: getSaleById
 *     tags:
 *       - sale
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/SaleId'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetSaleResponse'
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
  "/:seleId",
  requireAuth,
  permit(ROLE.ADMIN),
  saleController.getSaleById,
);

/**
 * @openapi
 * /sales/{saleId}:
 *   patch:
 *     summary: Update refund status by id (admin only)
 *     operationId: updateRefundStatus
 *     tags:
 *       - sale
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/SaleId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/UpdateRefundStatus'
 *     responses:
 *       '204':
 *         description: Refund status updated successfully
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
  "/:seleId",
  requireAuth,
  permit(ROLE.ADMIN),
  validateUpdateRefund,
  saleController.updateRefundStatus,
);
