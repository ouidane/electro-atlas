import express, { Router } from "express";
import { getDepartments } from "../../controllers/departmentsController";

export const router: Router = express.Router();

/**
 * @openapi
 * /departments:
 *   get:
 *     summary: Get all departments
 *     operationId: getDepartments
 *     tags:
 *       - departments
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 allDepartments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       subCategories:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *       '500':
 *         $ref: '#/components/responses/InternalServerError'
 */
router.get("/", getDepartments);
