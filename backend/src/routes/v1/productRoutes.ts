import express, { Router } from "express";
import { productController } from "../../controllers/productController";
import {
  requireAuth,
  permit,
  validateProduct,
  validateUpdateProduct,
  validateUpdateProductVisibility,
  validateGetProductsQuery,
} from "../../middlewares";
import { uploadImage } from "../../middlewares/multer";
import { ROLE } from "../../utils/constants";

export const router: Router = express.Router();

/**
 * @openapi
 * /products:
 *   get:
 *     summary: Get all products
 *     operationId: getAllProducts
 *     tags:
 *       - product
 *     parameters:
 *       - $ref: '#/components/parameters/Page'
 *       - $ref: '#/components/parameters/Limit'
 *       - $ref: '#/components/parameters/ProductSort'
 *       - $ref: '#/components/parameters/ProductFilterParams'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProductsResponse'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", validateGetProductsQuery, productController.getAllProducts);

/**
 * @openapi
 * /products:
 *   post:
 *     summary: Create a new product (admin only)
 *     operationId: createProduct
 *     tags:
 *       - product
 *     security:
 *       - AccessTokenAuth: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/CreateProduct'
 *     responses:
 *       '201':
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateProductResponse'
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
  permit(ROLE.ADMIN),
  uploadImage,
  validateProduct,
  productController.createProduct,
);

/**
 * @openapi
 * /products/{productId}:
 *   get:
 *     summary: Get a product by ID
 *     operationId: getProductById
 *     tags:
 *       - product
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetProductResponse'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/:productId", productController.getProductById);

/**
 * @openapi
 * /products/{productId}:
 *   put:
 *     summary: Update a product by ID (admin only)
 *     operationId: updateProduct
 *     tags:
 *       - product
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/UpdateProduct'
 *     responses:
 *       '204':
 *         description: Product updated successfully
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
router.put(
  "/:productId",
  requireAuth,
  permit(ROLE.ADMIN),
  uploadImage,
  validateUpdateProduct,
  productController.updateProduct,
);

/**
 * @openapi
 * /products/{productId}:
 *   delete:
 *     summary: Delete a product by ID (admin only)
 *     operationId: deleteProduct
 *     tags:
 *       - product
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *     responses:
 *       '204':
 *         description: Product deleted successfully
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
  "/:productId",
  requireAuth,
  permit(ROLE.ADMIN),

  productController.deleteProduct,
);

/**
 * @openapi
 * /products/{productId}/visibility:
 *   patch:
 *     summary: Update a product visibility by ID (admin only)
 *     operationId: updateProductVisibility
 *     tags:
 *       - product
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/ProductId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/UpdateProductVisibility'
 *     responses:
 *       '204':
 *         description: Product updated successfully
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
  "/:productId/visibility",
  requireAuth,
  permit(ROLE.ADMIN),
  validateUpdateProductVisibility,
  productController.updateProductVisibility,
);
