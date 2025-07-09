import { Category, SubCategory, SubCategoryDoc, CategoryDoc } from "../models";
import createError from "http-errors";
import {
  CloudinaryService,
  IMAGE_SIZES,
  ImageBuffer,
} from "./cloudinaryService";
import { logger } from "../utils/logger";

// ============= Interfaces =============
interface BaseCategoryFields {
  name?: string;
  description?: string;
  image?: ImageBuffer;
}

interface CategoryCreate extends Required<Omit<BaseCategoryFields, "image">> {
  image?: ImageBuffer;
}

export class CategoryService {
  private readonly cloudinaryService: CloudinaryService;
  private readonly CLOUDINARY_FOLDER = "nwmuofs9";

  constructor() {
    this.cloudinaryService = new CloudinaryService(
      {
        folder: "alx/categories",
        quality: "auto",
        format: "auto",
      },
      {
        defaultTransformation: {
          fetch_format: "auto",
          quality: "auto",
        },
      },
    );
  }

  async getCategories() {
    const result = await Category.find()
      .select("name image description")
      .sort({ createdAt: -1 })
      .lean();

    return result;
  }

  async getSingleCategory(categoryId: string) {
    const category = await Category.findById(categoryId).select("-__v").lean();

    if (!category) {
      throw createError(404, "Category not found");
    }

    return category;
  }

  async createCategory({ name, description, image }: CategoryCreate) {
    const category = await Category.create({ name, description });

    if (image) {
      await this.handleImageUpload(category, image);
    }
  }

  async updateCategory(
    categoryId: string,
    { name, description, image }: BaseCategoryFields,
  ) {
    const category = await Category.findById(categoryId);

    if (!category) {
      throw createError(404, "Category not found");
    }

    if (name) category.name = name;
    if (description) category.description = description;
    if (image) {
      await this.updateCategoryImage(category, image);
    } else {
      await category.save();
    }
  }

  async deleteCategory(categoryId: string) {
    const category = await Category.findById(categoryId);
    if (!category) {
      throw createError(404, "Category not found");
    }

    if (category.image?.publicId) {
      await this.cloudinaryService.destroyImage(category.image.publicId);
    }

    await Category.findByIdAndDelete(categoryId);
  }

  async getSubCategories(categoryId: string) {
    const result = await SubCategory.find({ categoryId })
      .select("name image description categoryId")
      .sort({ createdAt: -1 })
      .lean();

    return result;
  }

  async getSingleSubCategory(subCategoryId: string, categoryId: string) {
    const subCategory = await SubCategory.findOne({
      _id: subCategoryId,
      categoryId,
    })
      .select("-__v")
      .lean();

    if (!subCategory) {
      throw createError(404, "Sub Category not found");
    }

    return subCategory;
  }

  async createSubCategory({
    categoryId,
    name,
    description,
    image,
  }: BaseCategoryFields & { categoryId: string }) {
    const category = await Category.findById(categoryId).lean();
    if (!category) {
      throw createError(404, "Category not found");
    }

    const subCategory = await SubCategory.create({
      name,
      description,
      categoryId,
    });

    if (image) {
      await this.handleImageUpload(subCategory, image);
    }
  }

  async updateSubCategory(
    subCategoryId: string,
    categoryId: string,
    { name, description, image }: BaseCategoryFields,
  ) {
    const subCategory = await SubCategory.findOne({
      _id: subCategoryId,
      categoryId,
    });
    if (!subCategory) {
      throw createError(404, "Sub Category not found");
    }

    if (name) subCategory.name = name;
    if (description) subCategory.description = description;
    if (image) {
      await this.updateCategoryImage(subCategory, image);
    } else {
      await subCategory.save();
    }
  }

  async deleteSubCategory(subCategoryId: string, categoryId: string) {
    const subCategory = await SubCategory.findOne({
      _id: subCategoryId,
      categoryId,
    });
    if (!subCategory) {
      throw createError(404, "Sub Category not found");
    }

    if (subCategory.image?.publicId) {
      await this.deleteCategoryImage(subCategory.image.publicId);
    }

    await SubCategory.findByIdAndDelete(subCategoryId);
  }

  // ============= Private Helper Methods =============
  private async handleImageUpload(
    category: SubCategoryDoc | CategoryDoc,
    image: ImageBuffer,
  ) {
    const imageUrls = await this.cloudinaryService.uploadImage(
      image,
      this.CLOUDINARY_FOLDER,
      `category_${category._id}`,
      {
        transformation: [
          { width: IMAGE_SIZES.LARGE, crop: "scale" },
          { quality: "auto" },
        ],
      },
    );

    category.image = imageUrls;
    await category.save();
  }

  private async updateCategoryImage(
    category: SubCategoryDoc | CategoryDoc,
    newImage: ImageBuffer,
  ) {
    if (category.image?.publicId) {
      // Replace existing image
      const imageUrls = await this.cloudinaryService.replaceImage(
        category.image.publicId,
        newImage,
        this.CLOUDINARY_FOLDER,
        `category_${category._id}`,
      );
      category.image = imageUrls;
    } else {
      // Upload new image
      await this.handleImageUpload(category, newImage);
    }

    await category.save();
  }

  private async deleteCategoryImage(publicId: string) {
    try {
      await this.cloudinaryService.destroyImage(publicId);
    } catch (err) {
      logger.error(`Failed to delete category image ${publicId}:`, err);
    }
  }
}
