import { Types } from "mongoose";
import { Category, Product } from "../models";
import { MongooseFilterValue } from "../utils/queryHelpers";
import { QueryFiltersType } from "../middlewares/validateProduct";
import { ProductService } from "./productService";

const productService = new ProductService();

// ===== Constants =====
export const IMPORTANT_FILTER_KEYS = [
  "screenSize",
  "resolution",
  "memoryStorageCapacity",
  "operatingSystem",
  "weight",
  "material",
  "connectivity",
  "compatibleDevices",
] as const;

export const SECONDARY_FILTER_KEYS = [
  "_id",
  "batteries",
  "dimensions",
  "itemModelNumber",
  "weight",
] as const;

export class DiscoverService {
  // Product Queries for Best Offers
  async getBestOffers({
    categoryId,
    subCategoryId,
  }: {
    categoryId?: string;
    subCategoryId?: string;
  }) {
    const baseQuery: Record<string, unknown> = {
      "variant.discountPercent": { $gt: 0 },
      "variant.inventory": { $gt: 0 },
      visibility: true,
    };

    if (categoryId) {
      baseQuery.categoryId = new Types.ObjectId(categoryId);
    }

    if (subCategoryId) {
      baseQuery.subCategoryId = new Types.ObjectId(subCategoryId);
    }

    const products = await Product.aggregate([
      { $match: baseQuery },
      { $project: productService.buildProductProjection() },
      { $sort: { "variant.discountPercent": -1 } },
      { $limit: 10 },
    ]);

    return products;
  }

  // Product Queries for Best Sellers
  async getBestSellers({
    categoryId,
    subCategoryId,
  }: {
    categoryId?: string;
    subCategoryId?: string;
  }) {
    const baseQuery: Record<string, unknown> = {
      visibility: true,
    };

    if (categoryId) {
      baseQuery.categoryId = new Types.ObjectId(categoryId);
    }

    if (subCategoryId) {
      baseQuery.subCategoryId = new Types.ObjectId(subCategoryId);
    }

    const products = await Product.aggregate([
      { $match: baseQuery },
      { $project: productService.buildProductProjection("salesCount") },
      { $sort: { salesCount: -1 } },
      { $limit: 10 },
    ]);

    return { products };
  }

  // This method builds a query object based on the provided filters and returns products filter.
  async getProductsFilter(filters: QueryFiltersType) {
    const queryObject = productService.buildProductQuery(filters);

    const priceMatch = {} as { "variant.salePrice": MongooseFilterValue };
    if ("variant.salePrice" in queryObject) {
      priceMatch["variant.salePrice"] = queryObject["variant.salePrice"];
      delete queryObject["variant.salePrice" as keyof typeof queryObject];
    }

    if (!queryObject["categoryId"] && !queryObject["subCategoryId"]) {
      const categories = await Category.find()
        .select("name")
        .sort({ name: 1 })
        .lean();

      return { categories: categories.map((category) => ({ category })) };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const facetPipeline: any = {
      categories: this.buildCategoriesPipeline(),
      priceRange: this.buildPriceRangePipeline(),
    };

    if (queryObject["subCategoryId"]) {
      facetPipeline.specifications =
        this.buildSpecificationsPipeline(priceMatch);
    }

    const result = await Product.aggregate([
      { $match: { ...queryObject, visibility: true } },
      { $facet: facetPipeline },
    ]);

    return result[0];
  }

  // Recommended Products
  async getRecommendedProducts({
    categoryId,
    subCategoryId,
    excludeProductId,
  }: {
    categoryId?: string;
    subCategoryId?: string;
    excludeProductId?: string;
  }) {
    const baseQuery: Record<string, unknown> = {
      "variant.inventory": { $gt: 0 },
      visibility: true,
    };

    if (categoryId) {
      baseQuery.categoryId = new Types.ObjectId(categoryId);
    }

    if (subCategoryId) {
      baseQuery.subCategoryId = new Types.ObjectId(subCategoryId);
    }

    if (excludeProductId) {
      baseQuery._id = { $ne: new Types.ObjectId(excludeProductId) };
    }

    return Product.aggregate([
      { $match: baseQuery },
      {
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
      },
      { $project: productService.buildProductProjection("priorityScore") },
      { $sort: { priorityScore: -1 } },
      { $limit: 10 },
    ]);
  }

  private buildCategoriesPipeline() {
    return [
      {
        $group: {
          _id: null,
          categoryIds: { $addToSet: "$categoryId" },
          subCategoryIds: { $addToSet: "$subCategoryId" },
        },
      },
      { $unwind: "$categoryIds" },
      {
        $lookup: {
          from: "categories",
          let: { catId: "$categoryIds" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$catId"] } } },
            { $project: { _id: 1, name: 1 } },
            { $sort: { name: 1 } },
          ],
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $lookup: {
          from: "subcategories",
          let: { catId: "$category._id" },
          pipeline: [
            { $match: { $expr: { $eq: ["$categoryId", "$$catId"] } } },
            { $project: { _id: 1, name: 1 } },
            { $sort: { name: 1 } },
          ],
          as: "subcategories",
        },
      },
      {
        $project: {
          _id: 0,
          category: 1,
          subcategories: 1,
        },
      },
    ];
  }

  private buildPriceRangePipeline() {
    return [
      {
        $group: {
          _id: null,
          highestPrice: { $max: "$variant.salePrice" },
          lowestPrice: { $min: "$variant.salePrice" },
        },
      },
      {
        $project: {
          _id: 0,
          highestPrice: { $ceil: "$highestPrice" },
          lowestPrice: { $floor: "$lowestPrice" },
        },
      },
    ];
  }

  private buildSpecificationsPipeline(priceMatch: {
    "variant.salePrice": MongooseFilterValue;
  }) {
    return [
      { $match: priceMatch },
      {
        $project: {
          _id: 0,
          specificationsArray: {
            $objectToArray: {
              $mergeObjects: [
                {
                  $arrayToObject: {
                    $filter: {
                      input: { $objectToArray: "$specifications" },
                      as: "spec",
                      cond: {
                        $not: { $in: ["$$spec.k", SECONDARY_FILTER_KEYS] },
                        // $in: ["$$spec.k", IMPORTANT_FILTER_KEYS],
                      },
                    },
                  },
                },
                { brand: "$brand", color: "$variant.color" },
              ],
            },
          },
        },
      },
      { $unwind: "$specificationsArray" },
      {
        $group: {
          _id: "$specificationsArray.k",
          values: { $addToSet: "$specificationsArray.v" },
        },
      },
      {
        $project: {
          _id: 0,
          key: "$_id",
          values: {
            $reduce: {
              input: {
                $map: {
                  input: "$values",
                  as: "value",
                  in: { $split: ["$$value", ","] },
                },
              },
              initialValue: [],
              in: { $concatArrays: ["$$value", "$$this"] },
            },
          },
        },
      },
      {
        $project: {
          key: 1,
          values: {
            $map: {
              input: "$values",
              as: "val",
              in: { $trim: { input: "$$val" } },
            },
          },
        },
      },
      {
        $project: {
          key: 1,
          values: { $setUnion: ["$values", []] },
        },
      },
      {
        $project: {
          key: 1,
          values: { $sortArray: { input: "$values", sortBy: 1 } },
        },
      },
      { $sort: { key: 1 } },
    ];
  }
}
