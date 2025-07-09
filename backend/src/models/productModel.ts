import {
  Schema,
  model,
  Model,
  Aggregate,
  InferSchemaType,
  Document,
} from "mongoose";
import { ProductVariantsSchema } from "./productVariantModel";
import { ProductSpecificationsSchema } from "./productSpecificationsModel";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import CartItem from "./cartItemModel";
import Review from "./reviewModel";
import { ImageSchema } from "./imageModel";

export interface AggregatePaginateModel<T extends Document> extends Model<T> {
  aggregatePaginate<R>(
    query: Aggregate<R>,
    options?: {
      page?: number;
      limit?: number;
      [key: string]: unknown;
    }
  ): Promise<{
    docs: R[];
    totalDocs: number;
    limit: number;
    page: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
  }>;
}

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      uppercase: true,
      required: true,
      maxlength: 250,
    },
    description: { type: String, trim: true, required: true, maxlength: 8000 },
    brand: { type: String, trim: true, uppercase: true, required: true },
    modelName: { type: String, trim: true },
    whatsInTheBox: [{ type: String, trim: true }],
    features: [{ type: String, trim: true }],
    popularity: { type: Number, default: 0 },
    salesCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    visibility: { type: Boolean, default: false },
    image: { type: ImageSchema, default: undefined },
    variant: { type: ProductVariantsSchema, default: () => ({}) },
    specifications: ProductSpecificationsSchema,
    reviews: {
      type: new Schema(
        {
          avgRate: { type: Number, default: 0 },
          roundAvgRate: { type: Number, default: 0 },
          count: { type: Number, default: 0 },
        },
        { _id: false }
      ),
      default: () => ({}),
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.plugin(aggregatePaginate);

ProductSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await Promise.all([
        CartItem.deleteMany({ productId: this._id }),
        Review.deleteMany({ productId: this._id }),
      ]);
      next();
    } catch (err) {
      next(err as Error);
    }
  }
);

// Infer the schema type
export type ProductDoc = Document & InferSchemaType<typeof ProductSchema>;

const Product = model<ProductDoc, AggregatePaginateModel<ProductDoc>>(
  "Product",
  ProductSchema
);

export default Product;
