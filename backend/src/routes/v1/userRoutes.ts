import express, { Router } from "express";
import { userController } from "../../controllers/userController";
import {
  requireAuth,
  permit,
  validateUpdateUser,
  validateUpdateSelfUser,
  validateGetUsersQuery,
  validateAddToCart,
  validateUpdateMyCart,
  validateGetMyOrdersQuery,
} from "../../middlewares";
import { ROLE } from "../../utils/constants";
import { cartController } from "../../controllers/cartController";
import { wishlistController } from "../../controllers/wishlistController";
import { orderController } from "../../controllers/orderController";

export const router: Router = express.Router();

/**
 * @openapi
 * /users/me/cart:
 *   get:
 *     summary: Get my cart
 *     operationId: getMyCart
 *     tags:
 *       - user-cart
 *     security:
 *       - AccessTokenAuth: []
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
  "/me/cart",
  requireAuth,
  permit(ROLE.BUYER),
  cartController.getCartByUserId
);

/**
 * @openapi
 * /users/me/cart:
 *   put:
 *     summary: Clear my cart
 *     operationId: clearMyCart
 *     tags:
 *       - user-cart
 *     security:
 *       - AccessTokenAuth: []
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
  "/me/cart",
  requireAuth,
  permit(ROLE.BUYER),
  cartController.clearMyCart
);

/**
 * @openapi
 * /users/me/cart/items:
 *   post:
 *     summary: Add an item to my cart
 *     operationId: addItemToMyCart
 *     tags:
 *       - user-cart
 *     security:
 *       - AccessTokenAuth: []
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
  "/me/cart/items",
  requireAuth,
  permit(ROLE.BUYER),
  validateAddToCart,
  cartController.addItemToMyCart
);

/**
 * @openapi
 * /users/me/cart/items/:productId:
 *   patch:
 *     summary: Update an item in my cart
 *     operationId: updateItemInMyCart
 *     tags:
 *       - user-cart
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/UpdateItemInMyCart'
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
  "/me/cart/items/:productId",
  requireAuth,
  permit(ROLE.BUYER),
  validateUpdateMyCart,
  cartController.updateItemInMyCart
);

/**
 * @openapi
 * /users/me/cart/items/:productId:
 *   delete:
 *     summary: Remove an item from my cart
 *     operationId: RemoveItemFromMyCart
 *     tags:
 *       - user-cart
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
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
  "/me/cart/items/:productId",
  requireAuth,
  permit(ROLE.BUYER),
  cartController.removeItemFromMyCart
);

/**
 * @openapi
 * /users/me/wishlist:
 *   get:
 *     summary: Get my wishlist
 *     operationId: getMyWishlist
 *     tags:
 *       - user-wishlist
 *     security:
 *       - AccessTokenAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetWishlistResponse'
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
  "/me/wishlist",
  requireAuth,
  permit(ROLE.BUYER),
  wishlistController.getWishlistByUserId
);

/**
 * @openapi
 * /users/me/wishlist/items:
 *   post:
 *     summary: Add an item to my wishlist
 *     operationId: addItemToMyWishlist
 *     tags:
 *       - user-wishlist
 *     security:
 *       - AccessTokenAuth: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/AddWishlistItem'
 *     responses:
 *       '201':
 *         description: Wishlist item added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AddWishlistItemResponse'
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
  "/me/wishlist/items",
  requireAuth,
  permit(ROLE.BUYER),
  wishlistController.addItemToMyWishlist
);

/**
 * @openapi
 * /users/me/wishlist:
 *   put:
 *     summary: Clear my wishlist
 *     operationId: clearMyWishlist
 *     tags:
 *       - user-wishlist
 *     security:
 *       - AccessTokenAuth: []
 *     responses:
 *       '204':
 *         description: Wishlist cleared successfully
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
  "/me/wishlist",
  requireAuth,
  permit(ROLE.BUYER),
  wishlistController.clearMyWishlist
);

/**
 * @openapi
 * /users/me/wishlist/items/{productId}:
 *   delete:
 *     summary: Remove an item from my wishlist
 *     operationId: deleteItemFromMyWishlist
 *     tags:
 *       - user-wishlist
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
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
  "/me/wishlist/items/{productId}",
  requireAuth,
  permit(ROLE.BUYER),
  wishlistController.removeItemFromMyWishlist
);

/**
 * @openapi
 * /users/me/orders:
 *   get:
 *     summary: Get my orders
 *     operationId: getMyOrders
 *     tags:
 *       - user-orders
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
  "/me/orders",
  requireAuth,
  permit(ROLE.BUYER),
  validateGetMyOrdersQuery,
  orderController.getMyOrders
);

/**
 * @openapi
 * /users/me:
 *   get:
 *     summary: The current authenticated user
 *     operationId: getCurrentUser
 *     tags:
 *       - user-profile
 *     security:
 *       - AccessTokenAuth: []
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUserResponse'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/me", requireAuth, userController.getCurrentUser);

/**
 * @openapi
 * /users/me:
 *   patch:
 *     summary: Update the current authenticated user
 *     operationId: updateCurrentUser
 *     tags:
 *       - user-profile
 *     security:
 *       - AccessTokenAuth: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/UpdateUserRequest'
 *     responses:
 *       '204':
 *         description: User updated successfully
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
  "/me",
  requireAuth,
  validateUpdateSelfUser,
  userController.updateCurrentUser
);

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users (admin only)
 *     operationId: getAllUsers
 *     tags:
 *       - user
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/UserSort'
 *       - $ref: '#/components/parameters/UserFilterParams'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUsersResponse'
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
  validateGetUsersQuery,
  userController.getUsers
);

/**
 * @openapi
 * /users/{userId}:
 *   get:
 *     summary: Get user by id (admin only)
 *     operationId: getUserById
 *     tags:
 *       - user
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetUserResponse'
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
  "/:userId",
  requireAuth,
  permit(ROLE.ADMIN),
  userController.getUserById
);

/**
 * @openapi
 * /users/{userId}:
 *   patch:
 *     summary: Update user by id (admin only)
 *     operationId: updateUserById
 *     tags:
 *       - user
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/UpdateUserRequest'
 *     responses:
 *       '204':
 *         description: User updated successfully
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
  "/:userId",
  requireAuth,
  permit(ROLE.ADMIN),
  validateUpdateUser,
  userController.updateUserById
);

/**
 * @openapi
 * /users/{userId}:
 *   delete:
 *     summary: Delete user by id (admin only)
 *     operationId: deleteUserById
 *     tags:
 *       - user
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     responses:
 *       '204':
 *         description: User deleted successfully
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
  "/:userId",
  requireAuth,
  permit(ROLE.ADMIN),
  userController.deleteUserById
);
