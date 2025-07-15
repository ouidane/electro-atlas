import { Schema, model, InferSchemaType, Document } from "mongoose";

// Wishlist main schema
const WishlistSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
      },
    ],
  },
  { timestamps: true },
);

// Export inferred types
export type WishlistDoc = Document & InferSchemaType<typeof WishlistSchema>;

const Wishlist = model<WishlistDoc>("Wishlist", WishlistSchema);
export default Wishlist;
