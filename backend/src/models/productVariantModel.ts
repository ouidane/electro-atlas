import { Schema, InferSchemaType } from "mongoose";

export const ProductVariantsSchema = new Schema(
  {
    variation: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    color: { type: String },
    inventory: { type: Number, required: true, min: 0 },
    globalPrice: { type: Number, required: true, min: 0 },
    salePrice: { type: Number, min: 0 },
    discountPercent: { type: Number, default: 0 },
    saleStartDate: { type: Date, default: Date.now },
    saleEndDate: { type: Date },
  },
  { _id: false },
);

// Infer the type directly from schema
export type ProductVariantDoc = InferSchemaType<typeof ProductVariantsSchema>;
