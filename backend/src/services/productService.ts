import createError from "http-errors";
import { Product, ProductDoc, ProductSpecificationsSchema } from "../models";
import {
  CloudinaryService,
  IMAGE_SIZES,
  ImageBuffer,
} from "./cloudinaryService";
import {
  buildMongoFilter,
  buildSortQuery,
  FIELD_TYPES,
  FieldConfigMap,
  RawFilters,
} from "../utils/queryHelpers";
import {
  CreateProductType,
  GetProductsQueryType,
  UpdateProductType,
} from "../middlewares/validateProduct";
import { CategoryService } from "./categoryService";
import { logger } from "../utils/logger";

const categoryService = new CategoryService();

export class ProductService {
  private readonly CLOUDINARY_FOLDER = "r7skmjh9";
  private readonly cloudinaryService: CloudinaryService;

  constructor() {
    this.cloudinaryService = new CloudinaryService(
      {
        folder: "alx/products",
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

  async getAllProducts(queryParams: GetProductsQueryType) {
    const { limit, page, sort, filters } = queryParams;
    const hasSearch = !!filters?.query;

    const queryObject = this.buildProductQuery(filters);
    const sortCriteria = this.buildSortCriteria(sort, hasSearch);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pipeline: any = [];
    if (filters?.query) {
      const searchStage = {
        $search: {
          index: "default",
          compound: {
            must: [
              {
                text: {
                  query: filters?.query,
                  path: "name",
                  fuzzy: { maxEdits: 1, prefixLength: 2 },
                },
              },
            ],
            should: [
              {
                text: {
                  query: filters?.query,
                  path: "description",
                  score: { boost: { value: 1.5 } },
                },
              },
              {
                text: {
                  query: filters?.query,
                  path: "brand",
                  score: { boost: { value: 2.0 } },
                },
              },
            ],
          },
          highlight: {
            path: ["name", "description", "brand"],
          },
        },
      };

      pipeline.push(searchStage);
    }
    pipeline.push({ $match: { ...queryObject, visibility: true } });
    pipeline.push({
      $addFields: {
        priorityScore: {
          $add: [
            { $multiply: ["$popularity", 0.01] },
            { $multiply: ["$salesCount", 2] },
            { $cond: [{ $eq: ["$isFeatured", true] }, 10, 0] },
            { $multiply: ["$reviews.avgRate", 1.5] },
          ],
        },
      },
    });
    pipeline.push({
      $project: this.buildProductProjection(
        hasSearch ? "searchScore" : "priorityScore",
      ),
    });
    pipeline.push({ $sort: sortCriteria });

    const aggregate = Product.aggregate(pipeline);

    const options = { page, limit };
    return Product.aggregatePaginate(aggregate, options);
  }

  async getProductById(productId: string) {
    const product = await Product.findById(productId);
    if (!product) {
      throw createError(404, "Product not found");
    }
    product.popularity += 1;
    await product.save();
    return product;
  }

  async createProduct(productData: CreateProductType, image?: ImageBuffer) {
    await this.validateCategory(
      productData.subCategoryId,
      productData.categoryId,
    );

    const product = await Product.create(productData);
    if (image) {
      await this.handleProductImageUpload(product, image);
    }
  }

  async updateProduct(
    productId: string,
    updateData: UpdateProductType,
    image?: ImageBuffer,
  ) {
    const product = await this.getProductById(productId);
    // Handle image removal
    if (updateData.image === null) {
      product.image = undefined;
    } else if (image) {
      await this.updateProductImage(product, image);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { ...updateData, image: product.image },
      { new: true, runValidators: true },
    );

    return updatedProduct;
  }

  async deleteProduct(productId: string) {
    const product = await Product.findById(productId)
      .select({ image: 1 })
      .lean();
    if (!product) throw createError(404, "Product not found");

    if (product.image && product.image.publicId) {
      await this.deleteProductImage(product.image.publicId);
    }

    await Product.findByIdAndDelete(productId);
  }

  // Update product visibility
  async updateProductVisibility(productId: string, visibility: boolean) {
    await Product.findByIdAndUpdate(productId, { visibility });
  }

  // Product Query Builder
  buildProductQuery(filters: unknown) {
    const SPEC_KEYS = Object.keys(ProductSpecificationsSchema.obj);

    const customConfig: FieldConfigMap = {
      categoryId: { type: FIELD_TYPES.OBJECT_ID },
      subCategoryId: { type: FIELD_TYPES.OBJECT_ID },
      isFeatured: { type: FIELD_TYPES.BOOLEAN },
      isAvailable: { type: FIELD_TYPES.BOOLEAN },
      "variant.salePrice": {
        type: FIELD_TYPES.RANGE,
        minField: "minPrice",
        maxField: "maxPrice",
      },
      "reviews.averageRating": {
        type: FIELD_TYPES.RANGE,
        minField: "minRating",
        maxField: "maxRating",
      },
      "variant.inventory": {
        type: FIELD_TYPES.RANGE,
        minField: "minStock",
        maxField: "maxStock",
      },
      "variant.discountPercent": {
        type: FIELD_TYPES.RANGE,
        minField: "minDiscount",
        maxField: "maxDiscount",
      },
      color: { type: FIELD_TYPES.IN, searchField: "variant.color" },
      brand: { type: FIELD_TYPES.IN },
      ...Object.fromEntries(
        SPEC_KEYS.map((key) => [
          [`specifications.${key}`],
          {
            type: FIELD_TYPES.IN,
            searchField: key,
          },
        ]),
      ),
    };

    return buildMongoFilter(filters as RawFilters, customConfig);
  }

  private buildSortCriteria(sort?: string, hasSearch = false) {
    if (!sort) {
      // If $search was used, sort by score by default
      return hasSearch
        ? { score: { $meta: "textScore" } }
        : { priorityScore: -1 };
    }

    // Supported fields and their real MongoDB paths
    const ALLOWED_SORT_FIELDS = {
      rating: { field: "reviews.avgRate" },
      numOfReviews: { field: "reviews.count" },
      price: { field: "variant.salePrice" },
      discount: { field: "variant.discountPercent" },
      popularity: { field: "popularity" },
      bestSelling: { field: "salesCount" },
      stockAvailability: { field: "variant.inventory" },
      featured: { field: "isFeatured" },
      name: { field: "name" },
      score: { field: "priorityScore" },
    };

    return buildSortQuery(sort, ALLOWED_SORT_FIELDS);
  }

  buildProductProjection(
    includeField?: "searchScore" | "priorityScore" | "salesCount",
  ) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const projection: any = {
      name: 1,
      isFeatured: 1,
      variant: {
        $mergeObjects: [
          "$variant",
          {
            salePriceDecimal: {
              $cond: {
                if: { $ne: ["$variant.salePrice", null] },
                then: {
                  $let: {
                    vars: {
                      dollars: {
                        $trunc: { $divide: ["$variant.salePrice", 100] },
                      },
                      cents: { $mod: ["$variant.salePrice", 100] },
                    },
                    in: {
                      $concat: [
                        { $toString: "$$dollars" },
                        ".",
                        {
                          $cond: {
                            if: { $lt: ["$$cents", 10] },
                            then: { $concat: ["0", { $toString: "$$cents" }] },
                            else: { $toString: "$$cents" },
                          },
                        },
                      ],
                    },
                  },
                },
                else: null,
              },
            },
            globalPriceDecimal: {
              $let: {
                vars: {
                  price: { $ifNull: ["$variant.globalPrice", 0] },
                  dollars: {
                    $trunc: {
                      $divide: [{ $ifNull: ["$variant.globalPrice", 0] }, 100],
                    },
                  },
                  cents: {
                    $mod: [{ $ifNull: ["$variant.globalPrice", 0] }, 100],
                  },
                },
                in: {
                  $concat: [
                    { $toString: "$$dollars" },
                    ".",
                    {
                      $cond: {
                        if: { $lt: ["$$cents", 10] },
                        then: { $concat: ["0", { $toString: "$$cents" }] },
                        else: { $toString: "$$cents" },
                      },
                    },
                  ],
                },
              },
            },
            isInStock: {
              $cond: [{ $gt: ["$variant.inventory", 0] }, true, false],
            },
          },
        ],
      },
      reviews: 1,
      image: 1,
      createdAt: 1,
      updatedAt: 1,
    };

    if (includeField === "searchScore") {
      projection.score = { $meta: "searchScore" };
      projection.highlights = { $meta: "searchHighlights" };
    }
    if (includeField === "priorityScore") {
      projection.priorityScore = 1;
    }
    if (includeField === "salesCount") {
      projection.salesCount = 1;
    }

    return projection;
  }

  private async validateCategory(subCategoryId: string, categoryId: string) {
    await categoryService.getSingleSubCategory(subCategoryId, categoryId);
  }

  // ============= Image Management Methods =============

  private async handleProductImageUpload(
    product: ProductDoc,
    image: ImageBuffer,
  ) {
    const imageUrls = await this.cloudinaryService.uploadImage(
      image,
      this.CLOUDINARY_FOLDER,
      `product_${product._id}`,
      {
        transformation: [
          { width: IMAGE_SIZES.LARGE, crop: "scale" },
          { quality: "auto" },
        ],
      },
    );

    product.image = imageUrls;
    await product.save();
  }

  private async updateProductImage(product: ProductDoc, newImage: ImageBuffer) {
    if (product.image?.publicId) {
      // Replace existing image
      const imageUrls = await this.cloudinaryService.replaceImage(
        product.image.publicId,
        newImage,
        this.CLOUDINARY_FOLDER,
        `product_${product._id}`,
      );
      product.image = imageUrls;
    } else {
      // Upload new image
      await this.handleProductImageUpload(product, newImage);
    }

    await product.save();
  }

  private async deleteProductImage(publicId: string) {
    try {
      await this.cloudinaryService.destroyImage(publicId);
    } catch (err) {
      logger.error(`Failed to delete product image ${publicId}:`, err);
    }
  }
}
