import { Schema, model, InferSchemaType, Document, Model } from "mongoose";
import { ORDER_STATUS } from "../utils/constants";
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

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    deliveryId: { type: Schema.Types.ObjectId, ref: "Delivery" },
    paymentId: { type: Schema.Types.ObjectId, ref: "Payment" },
    orderItems: [{ type: Schema.Types.ObjectId, ref: "OrderItem" }],
    totalAmount: { type: Number, min: 0 },
    shippingAmount: { type: Number, min: 0, default: 0 },
    discountAmount: { type: Number, min: 0, default: 0 },
    orderStatus: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.CREATED,
    },
    notes: { type: String },
  },
  { timestamps: true },
);

OrderSchema.plugin(mongoosePaginate);

// Virtuals for decimal representation
OrderSchema.virtual("totalAmountDecimal").get(function (this) {
  return this.totalAmount != null
    ? (this.totalAmount / 100).toFixed(2)
    : undefined;
});

OrderSchema.virtual("shippingAmountDecimal").get(function (this) {
  return this.shippingAmount != null
    ? (this.shippingAmount / 100).toFixed(2)
    : undefined;
});

OrderSchema.virtual("discountAmountDecimal").get(function (this) {
  return this.discountAmount != null
    ? (this.discountAmount / 100).toFixed(2)
    : undefined;
});

// Infer the document type from the schema
export type OrderDoc = Document & InferSchemaType<typeof OrderSchema>;

const Order = model<OrderDoc, PaginateModel<OrderDoc>>("Order", OrderSchema);

export default Order;
