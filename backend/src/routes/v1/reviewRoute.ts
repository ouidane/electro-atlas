import express, { Router } from "express";
import { reviewController } from "../../controllers/reviewController";
import {
  permit,
  requireAuth,
  reviewAccess,
  validateCreateReview,
  validateUpdateReview,
} from "../../middlewares";
import { ROLE } from "../../utils/constants";

export const router: Router = express.Router({ mergeParams: true });

/**
 * @openapi
 * /products/{productId}/reviews:
 *   get:
 *     summary: Get all reviews for a product
 *     operationId: getReviews
 *     tags:
 *       - review
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetReviewsResponse'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", reviewController.getReviews);

/**
 * @openapi
 * /products/{productId}/reviews:
 *   post:
 *     summary: Create a new review
 *     operationId: createReview
 *     tags:
 *       - review
 *     security:
 *       - AccessTokenAuth: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/CreateReview'
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *     responses:
 *       '201':
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateReviewResponse'
 *       '400':
 *         $ref: '#/components/responses/BadRequestError'
 *       '401':
 *         $ref: '#/components/responses/UnauthorizedError'
 *       '403':
 *         $ref: '#/components/responses/ForbiddenError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.post(
  "/",
  requireAuth,
  permit(ROLE.BUYER, ROLE.ADMIN),
  validateCreateReview,
  reviewController.createReview,
);

/**
 * @openapi
 * /products/{productId}/reviews/{reviewId}:
 *   get:
 *     summary: Get a review by ID
 *     operationId: getReviewById
 *     tags:
 *       - review
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *       - $ref: '#/components/parameters/ReviewId'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetReviewResponse'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/:reviewId", reviewController.getReviewById);

/**
 * @openapi
 * /products/{productId}/reviews/{reviewId}:
 *   patch:
 *     summary: Update a review by ID
 *     operationId: updateReview
 *     tags:
 *       - review
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *       - $ref: '#/components/parameters/ReviewId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/UpdateReview'
 *     responses:
 *       '204':
 *         description: Review updated successfully
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
  "/:reviewId",
  requireAuth,
  permit(ROLE.BUYER, ROLE.ADMIN),
  reviewAccess,
  validateUpdateReview,
  reviewController.updateReview,
);

/**
 * @openapi
 * /products/{productId}/reviews/{reviewId}:
 *   delete:
 *     summary: Delete a review by ID
 *     operationId: deleteReview
 *     tags:
 *       - review
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *       - $ref: '#/components/parameters/ReviewId'
 *     responses:
 *       '204':
 *         description: Review deleted successfully
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
  "/:reviewId",
  requireAuth,
  permit(ROLE.BUYER, ROLE.ADMIN),
  reviewAccess,
  reviewController.deleteReview,
);
