import express, { Router } from "express";
import { cartController } from "../../controllers/cartController";
import {
  requireAuth,
  permit,
  cartAccess,
  validateGetCartsQuery,
  validateAddToCart,
  validateUpdateCart,
} from "../../middlewares";
import { ROLE } from "../../utils/constants";

export const router: Router = express.Router();

/**
 * @openapi
 * /carts:
 *   get:
 *     summary: Get all carts (admin only)
 *     operationId: getAllCarts
 *     tags:
 *       - cart
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/CartSort'
 *       - $ref: '#/components/parameters/CartFilterParams'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCartsResponse'
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
  validateGetCartsQuery,
  cartController.getCarts
);

/**
 * @openapi
 * /carts/{cartId}:
 *   get:
 *     summary: Get a cart by ID
 *     operationId: getCartById
 *     tags:
 *       - cart
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CartId'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCartResponse'
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
  "/:cartId",
  requireAuth,
  permit(ROLE.BUYER, ROLE.ADMIN),
  cartAccess,
  cartController.getCartById
);

/**
 * @openapi
 * /carts/{cartId}/items:
 *   post:
 *     summary: Add an item to a cart
 *     operationId: addItemToCart
 *     tags:
 *       - cart
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CartId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/AddCartItem'
 *     responses:
 *       '201':
 *         description: Cart item added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddCartItemResponse'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
  "/:cartId/items",
  requireAuth,
  permit(ROLE.BUYER, ROLE.ADMIN),
  cartAccess,
  validateAddToCart,
  cartController.addItemToCart
);

/**
 * @openapi
 * /carts/{cartId}/items:
 *   put:
 *     summary: Clear a cart
 *     operationId: clearCart
 *     tags:
 *       - cart
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CartId'
 *     responses:
 *       '204':
 *         description: Cart cleared successfully
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.put(
  "/:cartId/items",
  requireAuth,
  permit(ROLE.BUYER, ROLE.ADMIN),
  cartAccess,
  cartController.clearCart
);

/**
 * @openapi
 * /carts/{cartId}/items/{itemId}:
 *   get:
 *     summary: Get an item by ID
 *     operationId: getItemById
 *     tags:
 *       - cart
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CartId'
 *       - $ref: '#/components/parameters/CartItemId'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCartItemResponse'
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
  "/:cartId/items/:itemId",
  requireAuth,
  permit(ROLE.BUYER, ROLE.ADMIN),
  cartAccess,
  cartController.getItemById
);

/**
 * @openapi
 * /carts/{cartId}/items/{itemId}:
 *   patch:
 *     summary: Update an item in a cart
 *     operationId: updateItemInCart
 *     tags:
 *       - cart
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CartId'
 *       - $ref: '#/components/parameters/CartItemId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/UpdateCartItem'
 *     responses:
 *       '204':
 *         description: Cart item updated successfully
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
  "/:cartId/items/:itemId",
  requireAuth,
  permit(ROLE.BUYER, ROLE.ADMIN),
  cartAccess,
  validateUpdateCart,
  cartController.updateItemInCart
);

/**
 * @openapi
 * /carts/{cartId}/items/{itemId}:
 *   delete:
 *     summary: Remove an item from a cart
 *     operationId: RemoveItemFromCart
 *     tags:
 *       - cart
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CartId'
 *       - $ref: '#/components/parameters/CartItemId'
 *     responses:
 *       '204':
 *         description: Cart item deleted successfully
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.delete(
  "/:cartId/items/:itemId",
  requireAuth,
  permit(ROLE.BUYER, ROLE.ADMIN),
  cartAccess,
  cartController.removeItemFromCart
);
