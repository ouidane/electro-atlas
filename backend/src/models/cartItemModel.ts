import { Schema, model, InferSchemaType, Document } from "mongoose";

const CartItemSchema = new Schema(
  {
    quantity: { type: Number, required: true },
    cartId: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
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
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

CartItemSchema.virtual("product", {
  ref: "Product", // model name
  localField: "productId", // field in CartItem
  foreignField: "_id", // field in Product
  justOne: true, // because it’s a 1:1 relation
});

export type CartItemDoc = Document & InferSchemaType<typeof CartItemSchema>;

const CartItem = model<CartItemDoc>("CartItem", CartItemSchema);

export default CartItem;
