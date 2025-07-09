import { Delivery, ProfileDoc } from "../models";
import { DELIVERY_STATUS } from "../utils/constants";

export class DeliveryService {
  static async createDelivery(profile: ProfileDoc, orderId: unknown) {
    const twoDays = 2 * 24 * 60 * 60 * 1000;
    const estimatedDeliveryDate = new Date(Date.now() + twoDays);

    const delivery = await Delivery.create({
      orderId,
      deliveryStatus: DELIVERY_STATUS.PENDING,
      estimatedDeliveryDate,
      userId: profile.userId,
      carrier: "FedEx",
      shippingAddress: {
        street: profile.address?.line1,
        city: profile.address?.city,
        country: profile.address?.country,
        postalCode: profile.address?.postalCode,
      },
    });

    return delivery;
  }
}
