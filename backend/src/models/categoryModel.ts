import { Schema, model, InferSchemaType, Document, Model } from "mongoose";
import { ImageSchema } from "./imageModel";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import mongoosePaginate from "mongoose-paginate-v2";

export interface PaginateResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page?: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
  pagingCounter?: number;
  meta?: unknown;
}

export interface PaginateModel<T extends Document> extends Model<T> {
  paginate(
    query?: unknown,
    options?: unknown,
    callback?: (err: unknown, result: PaginateResult<T>) => void,
  ): Promise<PaginateResult<T>>;
}

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, lowercase: true },
    image: ImageSchema,
    description: { type: String, trim: true, maxlength: 1000 },
  },
  { timestamps: true },
);

CategorySchema.plugin(mongoosePaginate);
CategorySchema.plugin(mongooseLeanVirtuals);

CategorySchema.pre("deleteOne", async function (next) {
  const { _id: categoryId } = this.getQuery();
  const SubCategory = model("SubCategory");
  if (SubCategory) {
    await SubCategory.deleteMany({ categoryId });
  }
  next();
});

export type CategoryDoc = Document & InferSchemaType<typeof CategorySchema>;

const Category = model<CategoryDoc>("Category", CategorySchema);
export default Category;
