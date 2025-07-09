import { Schema, model, InferSchemaType, Document, Model } from "mongoose";
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
    callback?: (err: unknown, result: PaginateResult<T>) => void
  ): Promise<PaginateResult<T>>;
}

const OrderItemSchema = new Schema(
  {
    orderId: { type: Schema.Types.ObjectId, ref: "Order" },
    productId: { type: Schema.Types.ObjectId, ref: "Product" },
    quantity: { type: Number, required: true, min: 1 },
    unitAmount: { type: Number, required: true, min: 0 },
    totalPrice: { type: Number, required: true, min: 0 },
    productName: { type: String, required: true },
    image: { type: String },
    isRefunded: { type: Boolean, default: false },
    refundedQuantity: { type: Number, default: 0, min: 0 },
    notes: { type: String },
  },
  { timestamps: true }
);

OrderItemSchema.plugin(mongooseLeanVirtuals);
OrderItemSchema.plugin(mongoosePaginate);

// Virtuals for decimal representation as strings with 2 decimal places
OrderItemSchema.virtual("unitAmountDecimal").get(function (this) {
  return this.unitAmount != null
    ? (this.unitAmount / 100).toFixed(2)
    : undefined;
});

OrderItemSchema.virtual("totalPriceDecimal").get(function (this) {
  return this.totalPrice != null
    ? (this.totalPrice / 100).toFixed(2)
    : undefined;
});

// Infer the document type from the schema
export type OrderItemDoc = Document & InferSchemaType<typeof OrderItemSchema>;

const OrderItem = model<OrderItemDoc, PaginateModel<OrderItemDoc>>(
  "OrderItem",
  OrderItemSchema
);

export default OrderItem;
