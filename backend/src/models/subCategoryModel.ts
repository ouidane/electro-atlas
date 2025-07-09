import { Schema, Document, InferSchemaType, model } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import type { CategoryDoc } from "./categoryModel";
import { ImageSchema } from "./imageModel";

const SubCategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, lowercase: true },
    image: ImageSchema,
    description: { type: String, trim: true, maxlength: 1000 },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

SubCategorySchema.plugin(mongooseLeanVirtuals);

SubCategorySchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

export type SubCategoryDoc = Document &
  InferSchemaType<typeof SubCategorySchema> & {
    category?: CategoryDoc;
  };

const SubCategory = model<SubCategoryDoc>("SubCategory", SubCategorySchema);
export default SubCategory;
