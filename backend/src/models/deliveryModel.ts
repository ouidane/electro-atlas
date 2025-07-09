import {
  Schema,
  model,
  Model,
  Types,
  InferSchemaType,
  Document,
} from "mongoose";
import { DELIVERY_STATUS, type DeliveryStatus } from "../utils/constants";

// Define the schema
const DeliverySchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: Object.values(DELIVERY_STATUS),
      default: DELIVERY_STATUS.PENDING,
    },
    carrier: { type: String },
    estimatedDeliveryDate: { type: Date, required: true },
    actualDeliveryDate: { type: Date },
    shippingAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      country: { type: String, required: true },
      postalCode: { type: String, required: true },
    },
  },
  { timestamps: true },
);

// Infer the document type from the schema
export type DeliveryDoc = Document & InferSchemaType<typeof DeliverySchema>;

// Define the model static methods
export interface DeliveryModel extends Model<DeliveryDoc> {
  updateDeliveryStatus(
    deliveryId: Types.ObjectId,
    newStatus: DeliveryStatus,
    location: string,
    description: string,
  ): Promise<DeliveryDoc>;

  updateTrackingInfo(
    deliveryId: Types.ObjectId,
    carrier: string,
  ): Promise<DeliveryDoc>;
}

// Attach static methods
DeliverySchema.statics.updateDeliveryStatus = async function (
  deliveryId: Types.ObjectId,
  newStatus: DeliveryStatus,
  location: string,
  description: string,
): Promise<DeliveryDoc> {
  const delivery = await this.findById(deliveryId);
  if (!delivery) {
    throw new Error("Delivery not found");
  }

  delivery.deliveryStatus = newStatus;
  delivery.trackingHistory.push({
    status: newStatus,
    location,
    timestamp: new Date(),
    description,
  });

  if (newStatus === DELIVERY_STATUS.DELIVERED) {
    delivery.actualDeliveryDate = new Date();
  }

  await delivery.save();
  return delivery;
};

DeliverySchema.statics.updateTrackingInfo = async function (
  deliveryId: Types.ObjectId,
  carrier: string,
): Promise<DeliveryDoc> {
  const delivery = await this.findByIdAndUpdate(
    deliveryId,
    { carrier },
    { new: true },
  );
  if (!delivery) {
    throw new Error("Delivery not found");
  }
  return delivery;
};

// Create the model
const Delivery = model<DeliveryDoc, DeliveryModel>("Delivery", DeliverySchema);
export default Delivery;
