import express, { Router } from "express";
import { categoryController } from "../../controllers/categoryController";
import { requireAuth, permit } from "../../middlewares";
import { uploadImage } from "../../middlewares/multer";
import { ROLE } from "../../utils/constants";

export const router: Router = express.Router();

/**
 * @openapi
 * /categories:
 *   get:
 *     summary: Get all categories
 *     operationId: getParentCategories
 *     tags:
 *       - category
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCategoriesResponse'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", categoryController.getCategories);

/**
 * @openapi
 * /categories:
 *   post:
 *     summary: Create a new category (admin only)
 *     operationId: createCategory
 *     tags:
 *       - category
 *     security:
 *       - AccessTokenAuth: []
 *     requestBody:
 *       $ref: '#/components/requestBodies/CreateCategory'
 *     responses:
 *       '201':
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateCategoryResponse'
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
  categoryController.createCategory
);

/**
 * @openapi
 * /categories/{categoryId}:
 *   get:
 *     summary: Get a category by ID
 *     operationId: getSingleCategory
 *     tags:
 *       - category
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryId'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCategoryResponse'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/:categoryId", categoryController.getSingleCategory);

/**
 * @openapi
 * /categories/{categoryId}:
 *   put:
 *     summary: Update a category by ID (admin only)
 *     operationId: updateCategory
 *     tags:
 *       - category
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/UpdateCategory'
 *     responses:
 *       '204':
 *         description: Category updated successfully
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
  "/:categoryId",
  requireAuth,
  permit(ROLE.ADMIN),
  uploadImage,
  categoryController.updateCategory
);

/**
 * @openapi
 * /categories/{categoryId}:
 *   delete:
 *     summary: Delete a category by ID (admin only)
 *     operationId: deleteCategory
 *     tags:
 *       - category
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryId'
 *     responses:
 *       '204':
 *         description: Category deleted successfully
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
  "/:categoryId",
  requireAuth,
  permit(ROLE.ADMIN),
  categoryController.deleteCategory
);

/**
 * @openapi
 * /categories/{categoryId}/subCategories:
 *   get:
 *     summary: Get sub categories
 *     operationId: getChildCategories
 *     tags:
 *       - category
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryId'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetSubCategoriesResponse'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/:categoryId/subCategories", categoryController.getSubCategories);

/**
 * @openapi
 * /categories/{categoryId}/subCategories:
 *   post:
 *     summary: Create a sub category (admin only)
 *     operationId: createSubCategory
 *     tags:
 *       - category
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/CreateSubCategory'
 *     responses:
 *       '201':
 *         description: Sub category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateSubCategoryResponse'
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
router.post(
  "/:categoryId/subCategories",
  requireAuth,
  permit(ROLE.ADMIN),
  uploadImage,
  categoryController.createSubCategory
);

/**
 * @openapi
 * /categories/{categoryId}/subCategories/{subCategoryId}:
 *   get:
 *     summary: Get a sub category by ID
 *     operationId: getSingleSubCategory
 *     tags:
 *       - category
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryId'
 *       - $ref: '#/components/parameters/SubCategoryId'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetSubCategoryResponse'
 *       '404':
 *         $ref: '#/components/responses/NotFoundError'
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get(
  "/:categoryId/subCategories/:subCategoryId",
  categoryController.getSingleSubCategory
);

/**
 * @openapi
 * /categories/{categoryId}/subCategories/{subCategoryId}:
 *   put:
 *     summary: Update a sub category by ID (admin only)
 *     operationId: updateSubCategory
 *     tags:
 *       - category
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryId'
 *       - $ref: '#/components/parameters/SubCategoryId'
 *     requestBody:
 *       $ref: '#/components/requestBodies/UpdateSubCategory'
 *     responses:
 *       '204':
 *         description: Sub category updated successfully
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
  "/:categoryId/subCategories/:subCategoryId",
  requireAuth,
  permit(ROLE.ADMIN),
  uploadImage,
  categoryController.updateSubCategory
);

/**
 * @openapi
 * /categories/{categoryId}/subCategories/{subCategoryId}:
 *   delete:
 *     summary: Delete a sub category by ID (admin only)
 *     operationId: deleteSubCategory
 *     tags:
 *       - category
 *     security:
 *       - AccessTokenAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/CategoryId'
 *       - $ref: '#/components/parameters/SubCategoryId'
 *     responses:
 *       '204':
 *         description: Sub category deleted successfully
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
  "/:categoryId/subCategories/:subCategoryId",
  requireAuth,
  permit(ROLE.ADMIN),
  categoryController.deleteSubCategory
);
