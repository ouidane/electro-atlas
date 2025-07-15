import { Types } from "mongoose";
import { Category, OrderItem, Product } from "../models";
import { MongooseFilterValue } from "../utils/queryHelpers";
import { QueryFiltersType } from "../middlewares/validateProduct";
import { ProductService, SECONDARY_FILTER_KEYS } from "./productService";

const productService = new ProductService();

export class DiscoverService {
  // Category-based Product Queries
  async getBestOffersByCategory() {
    const categories = await Category.find().sort("name").lean();

    return Promise.all(
      categories.map(async (category) => {
        const products = await Product.aggregate([
          {
            $match: {
              categoryId: category._id,
              visibility: true,
              "variant.discountPercent": { $gt: 0 },
            },
          },
          { $project: productService.buildProductProjection() },
          { $sort: { "variant.discountPercent": -1 } },
          { $limit: 10 },
        ]);

        return {
          category: {
            _id: category._id,
            name: category.name,
          },
          products,
        };
      }),
    );
  }

  // Category-based Product Queries for Best Sellers
  async getBestSellersByCategory() {
    const categories = await Category.find().lean();

    return Promise.all(
      categories.map(async (category) => {
        const products = await OrderItem.aggregate([
          { $group: { _id: "$productId", numOfOrders: { $sum: 1 } } },
          {
            $lookup: {
              from: "products",
              localField: "_id",
              foreignField: "_id",
              as: "product",
            },
          },
          { $unwind: "$product" },
          {
            $match: {
              "product.categoryId": category._id,
              "product.visibility": true,
              "product.variant.inventory": { $gt: 0 },
            },
          },
          {
            $project: this.buildBestSellersProjection(),
          },
          { $sort: { numOfOrders: -1 } },
          { $limit: 10 },
        ]);

        return {
          category: {
            _id: category._id,
            name: category.name,
          },
          products,
        };
      }),
    );
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

      return { categories };
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
  async getRecommendedProducts(
    categoryId: string,
    excludeProductId: string,
    limit: number = 10,
  ) {
    const baseQuery: Record<string, unknown> = {
      "variant.inventory": { $gt: 0 },
      visibility: true,
    };

    if (categoryId) {
      baseQuery.categoryId = new Types.ObjectId(categoryId);
    }

    if (excludeProductId) {
      baseQuery._id = { $ne: excludeProductId };
    }

    return Product.aggregate([
      { $match: baseQuery },
      {
        $addFields: {
          score: {
            $add: [
              { $multiply: ["$popularity", 0.3] },
              { $multiply: ["$salesCount", 0.2] },
              { $cond: [{ $eq: ["$isFeatured", true] }, 10, 0] },
              { $multiply: ["$reviews.averageRating", 1.5] },
            ],
          },
        },
      },
      { $sort: { score: -1 } },
      { $limit: limit },
      { $project: productService.buildProductProjection() },
    ]);
  }

  private buildBestSellersProjection() {
    return {
      name: "$product.name",
      isFeatured: "$product.isFeatured",
      variant: {
        $mergeObjects: [
          "$product.variant",
          {
            salePriceDecimal: {
              $cond: {
                if: { $ne: ["$product.variant.salePrice", null] },
                then: {
                  $toString: {
                    $round: [
                      { $divide: ["$product.variant.salePrice", 100] },
                      2,
                    ],
                  },
                },
                else: null,
              },
            },
            globalPriceDecimal: {
              $toString: {
                $round: [{ $divide: ["$product.variant.globalPrice", 100] }, 2],
              },
            },
            isInStock: {
              $cond: {
                if: { $gt: ["$product.variant.inventory", 0] },
                then: true,
                else: false,
              },
            },
          },
        ],
      },
      reviews: "$product.reviews",
      image: "$product.image",
      createdAt: "$product.createdAt",
      updatedAt: "$product.updatedAt",
    };
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
