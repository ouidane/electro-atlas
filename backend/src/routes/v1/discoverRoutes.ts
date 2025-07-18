import express, { Router } from "express";
import { discoverController } from "../../controllers/discoverController";

export const router: Router = express.Router();

/**
 * @openapi
 * /discover/recommendations:
 *   get:
 *     summary: Get recommended products
 *     operationId: recommendedProducts
 *     tags:
 *       - discover
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryIdQuery'
 *       - $ref: '#/components/parameters/SubCategoryIdQuery'
 *       - $ref: '#/components/parameters/ExcludeProductIdQuery'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetRecommendedProductsResponse'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/recommendations", discoverController.recommendedProducts);

/**
 * @openapi
 * /discover/best-offers:
 *   get:
 *     summary: Get best offers
 *     operationId: bestOffers
 *     tags:
 *       - discover
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryIdQuery'
 *       - $ref: '#/components/parameters/SubCategoryIdQuery'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetBestOffersResponse'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/best-offers", discoverController.bestOffers);

/**
 * @openapi
 * /discover/best-seller:
 *   get:
 *     summary: Get best sellers
 *     operationId: bestSeller
 *     tags:
 *       - discover
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryIdQuery'
 *       - $ref: '#/components/parameters/SubCategoryIdQuery'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetBestSellersResponse'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/best-seller", discoverController.bestSeller);
