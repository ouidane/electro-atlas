import express, { Router } from "express";
import { wishlistController } from "../../controllers/wishlistController";
import {
  requireAuth,
  permit,
  wishlistAccess,
  validateAddItem,
} from "../../middlewares";
import { ROLE } from "../../utils/constants";

export const router: Router = express.Router();

/**
 * @openapi
 * /wishlists:
 *   get:
 *     summary: Get All Wishlist (admin only)
 *     operationId: getAllWishlists
 *     tags:
 *       - wishlist
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetWishlistsResponse'
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
  wishlistController.getWishlists,
);

/**
 * @openapi
 * /wishlists:
 *   put:
 *     summary: Clear wishlist
 *     operationId: clearWishlist
 *     tags:
 *       - wishlist
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
  "/",
  requireAuth,
  permit(ROLE.BUYER, ROLE.ADMIN),
  wishlistAccess,
  wishlistController.clearWishlist,
);

/**
 * @openapi
 * /wishlists/{wishlistId}:
 *   get:
 *     summary: Get a wishlist by ID
 *     operationId: getWishlistById
 *     tags:
 *       - wishlist
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/WishlistId'
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
  "/:wishlistId",
  requireAuth,
  permit(ROLE.BUYER, ROLE.ADMIN),
  wishlistAccess,
  wishlistController.getWishlistById,
);

/**
 * @openapi
 * /wishlists/{wishlistId}:
 *   post:
 *     summary: Add an item to a wishlist
 *     operationId: addItemToWishlist
 *     tags:
 *       - wishlist
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/WishlistId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/AddWishlistItem'
 *     responses:
 *       '201':
 *         description: Cart item added successfully
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
  "/:wishlistId",
  requireAuth,
  permit(ROLE.BUYER, ROLE.ADMIN),
  wishlistAccess,
  validateAddItem,
  wishlistController.addItemToWishlist,
);

/**
 * @openapi
 * /wishlists/{wishlistId}:
 *   delete:
 *     summary: Remove an item from a wishlist
 *     operationId: deleteItemFromWishlist
 *     tags:
 *       - wishlist
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/WishlistId'
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
  "/:wishlistId",
  requireAuth,
  permit(ROLE.BUYER, ROLE.ADMIN),
  wishlistAccess,
  wishlistController.deleteItemFromWishlist,
);
