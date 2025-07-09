import { Schema, model, InferSchemaType, Document } from "mongoose";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";
import { ProfileDoc } from "./profileModel";

// Create the schema for Review
const ReviewSchema = new Schema(
  {
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

ReviewSchema.index({ productId: 1, userId: 1 }, { unique: true });

ReviewSchema.plugin(mongooseLeanVirtuals);

// Link to Profile (not User) for additional user details
ReviewSchema.virtual("user", {
  ref: "Profile",
  localField: "userId",
  foreignField: "userId",
  justOne: true,
});

// Export inferred type
export type ReviewDoc = Document &
  InferSchemaType<typeof ReviewSchema> & {
    user?: ProfileDoc;
  };

const Review = model<ReviewDoc>("Review", ReviewSchema);
export default Review;
