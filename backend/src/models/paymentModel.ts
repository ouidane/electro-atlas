import { Schema, model, InferSchemaType, Document } from "mongoose";
import { PAYMENT_STATUS, PAYMENT_METHOD } from "../utils/constants";

const PaymentSchema = new Schema(
  {
    amountTotal: { type: Number, required: true },
    customerId: { type: String },
    transactionId: { type: String },
    refundId: { type: String },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },
    paymentMethod: {
      type: String,
      enum: Object.values(PAYMENT_METHOD),
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// Infer the document type
export type PaymentDoc = Document & InferSchemaType<typeof PaymentSchema>;

const Payment = model<PaymentDoc>("Payment", PaymentSchema);

export default Payment;
