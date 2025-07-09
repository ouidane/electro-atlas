import { Types } from "mongoose";
import { Product, OrderItem } from "../models";
import createError from "http-errors";
import { FormattedCartItemType } from "./cartService";

export class InventoryService {
  // Inventory Validation
  static async checkStock(
    formattedItems: FormattedCartItemType[],
  ): Promise<void> {
    const productIds = formattedItems.map((item) => item.product._id);
    const products = await Product.find({ _id: { $in: productIds } }).lean();
    const productMap = new Map(products.map((p) => [p._id.toString(), p]));

    const outOfStock: Array<{
      itemId: string | Types.ObjectId;
      productId: string | Types.ObjectId;
      requestedQuantity: number;
      availableInventory: number;
      image?: string;
    }> = [];

    for (const item of formattedItems) {
      const product = productMap.get(item.product._id.toString());
      const variant = product?.variant;

      if (variant && variant.inventory < item.quantity) {
        outOfStock.push({
          itemId: item.itemId,
          productId: item.product._id,
          requestedQuantity: item.quantity,
          availableInventory: variant.inventory,
          image: item.product.image,
        });
      }
    }

    if (outOfStock.length > 0) {
      throw createError(409, {
        message: "Unable to process order due to inventory issues",
        errors: {
          totalItemsChecked: formattedItems.length,
          outOfStockItems: outOfStock.length,
          details: outOfStock,
        },
      });
    }
  }

  //  Inventory Management
  static async updateInventory(orderId: unknown) {
    const orderItems = await OrderItem.find({ orderId });

    const bulkOperations = orderItems.map((item) => ({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { "variant.inventory": -item.quantity } },
      },
    }));

    if (bulkOperations.length > 0) {
      await Product.bulkWrite(bulkOperations);
    }
  }

  static async restoreInventory(orderId: unknown) {
    const orderItems = await OrderItem.find({ orderId });

    const bulkOperations = orderItems.map((item) => ({
      updateOne: {
        filter: { _id: item.productId },
        update: { $inc: { "variant.inventory": item.quantity } },
      },
    }));

    if (bulkOperations.length > 0) {
      await Product.bulkWrite(bulkOperations);
    }
  }
}
