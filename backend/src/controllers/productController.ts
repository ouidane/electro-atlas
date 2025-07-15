import { Request, Response, NextFunction } from "express";
import { ProductService } from "../services/productService";
import { GetProductsQueryType } from "../middlewares/validateProduct";
import paginateResponse from "../utils/paginateResponse";

export const productService = new ProductService();

class ProductController {
  // Get all products
  async getAllProducts(req: Request, res: Response) {
    const queryParams = req.parsedQuery as GetProductsQueryType;
    const baseUrl = `${req.baseUrl}${req.path}`;

    const result = await productService.getAllProducts(queryParams);
    const resultWithPagination = paginateResponse(result, queryParams, baseUrl);
    res.status(200).json(resultWithPagination);
  }

  // Get product by id
  async getProductById(req: Request, res: Response) {
    const data = await productService.getProductById(req.params.productId);
    res.status(200).json({ data });
  }

  // Create product
  async createProduct(req: Request, res: Response) {
    await productService.createProduct(
      req.body,
      req.file as Express.Multer.File,
    );
    res.status(201).json({ message: "Product created" });
  }

  // Update product
  async updateProduct(req: Request, res: Response) {
    const { productId } = req.params;
    await productService.updateProduct(
      productId,
      req.body,
      req.file as Express.Multer.File,
    );
    res.sendStatus(204);
  }

  // Delete product
  async deleteProduct(req: Request, res: Response) {
    await productService.deleteProduct(req.params.productId);
    res.sendStatus(204);
  }

  // Update product visibility
  async updateProductVisibility(req: Request, res: Response) {
    await productService.updateProductVisibility(
      req.params.productId,
      req.body,
    );
    res.sendStatus(204);
  }
}

export const productController = new ProductController();
