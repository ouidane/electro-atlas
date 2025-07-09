import express, { Router } from "express";
import { discoverController } from "../../controllers/discoverController";
import { validateQueryFilters } from "../../middlewares";

export const router: Router = express.Router();

/**
 * @openapi
 * /products-filter:
 *   get:
 *     summary: Get products filter
 *     operationId: productsFilter
 *     tags:
 *       - filter
 *     parameters:
 *       - name: categoryId
 *         in: query
 *         schema:
 *           type: string
 *       - name: subCategoryId
 *         in: query
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 filters:
 *                   type: object
 *                   properties:
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           category:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           subcategories:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                     priceRange:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           highestPrice:
 *                             type: integer
 *                           lowestPrice:
 *                             type: integer
 *                     specifications:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           key:
 *                             type: string
 *                           values:
 *                             type: array
 *                             items:
 *                               type: string
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", validateQueryFilters, discoverController.productsFilter);
