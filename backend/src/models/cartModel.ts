import { Schema, model, InferSchemaType, Document, Model } from "mongoose";
import CartItem from "./cartItemModel";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseLeanVirtuals from "mongoose-lean-virtuals";

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

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },
    totalItems: { type: Number, default: 0 },
  },
  { timestamps: true },
);

CartSchema.virtual("cartItems", {
  ref: "CartItem",
  localField: "_id",
  foreignField: "cartId",
});

CartSchema.virtual("amountDecimal").get(function () {
  if (typeof this.amount === "number") {
    return (this.amount / 100).toFixed(2);
  }
  return null;
});

CartSchema.plugin(mongoosePaginate);
CartSchema.plugin(mongooseLeanVirtuals);

CartSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      await CartItem.deleteMany({ cartId: this._id });
      next();
    } catch (err) {
      next(err as Error);
    }
  },
);

export type CartDoc = Document & InferSchemaType<typeof CartSchema>;

const Cart = model<CartDoc, PaginateModel<CartDoc>>("Cart", CartSchema);
export default Cart;
