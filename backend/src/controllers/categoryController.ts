import { Request, Response, NextFunction } from "express";
import { CategoryService } from "../services/categoryService";
import createError from "http-errors";

const categoryService = new CategoryService();

class CategoryController {
  async getCategories(req: Request, res: Response) {
    const data = await categoryService.getCategories();
    res.status(200).json({ data });
  }

  async getSingleCategory(req: Request, res: Response) {
    const data = await categoryService.getSingleCategory(req.params.categoryId);
    res.status(200).json({ data });
  }

  async createCategory(req: Request, res: Response) {
    const { name, description } = req.body;

    if (!name) {
      throw createError(400, "Category name is required");
    }

    await categoryService.createCategory({
      name,
      description,
      image: req.file,
    });
    res.status(201).json({ message: "Category created." });
  }

  async updateCategory(req: Request, res: Response) {
    const { name, description } = req.body;

    if (!name && !description && !req.file) {
      throw createError(
        400,
        "At least one field (name, description, or image) must be provided for update"
      );
    }

    await categoryService.updateCategory(req.params.categoryId, {
      name,
      description,
      image: req.file,
    });
    res.sendStatus(204);
  }

  async deleteCategory(req: Request, res: Response) {
    await categoryService.deleteCategory(req.params.categoryId);
    res.sendStatus(204);
  }

  async getSubCategories(req: Request, res: Response) {
    const data = await categoryService.getSubCategories(req.params.categoryId);
    res.status(200).json({ data });
  }

  async getSingleSubCategory(req: Request, res: Response) {
    const data = await categoryService.getSingleSubCategory(
      req.params.subCategoryId,
      req.params.categoryId
    );
    res.status(200).json({ data });
  }

  // Create child category
  async createSubCategory(req: Request, res: Response, next: NextFunction) {
    const { name, description } = req.body;
    await categoryService.createSubCategory({
      categoryId: req.params.categoryId,
      name,
      description,
      image: req.file,
    });
    res.status(201).json({ message: "SubCategory created." });
  }

  async updateSubCategory(req: Request, res: Response, next: NextFunction) {
    const { name, description } = req.body;
    await categoryService.updateSubCategory(
      req.params.subCategoryId,
      req.params.categoryId,
      {
        name,
        description,
        image: req.file,
      }
    );
    res.sendStatus(204);
  }

  async deleteSubCategory(req: Request, res: Response, next: NextFunction) {
    await categoryService.deleteSubCategory(
      req.params.subCategoryId,
      req.params.categoryId
    );
    res.sendStatus(204);
  }
}

export const categoryController = new CategoryController();
