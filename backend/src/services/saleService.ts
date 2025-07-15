import { OrderItem } from "../models";
import createError from "http-errors";
import {
  buildMongoFilter,
  buildSortQuery,
  FIELD_TYPES,
  FieldConfigMap,
  RawFilters,
} from "../utils/queryHelpers";
import { GetSalesQueryType } from "../middlewares";

export class SaleService {
  // Get all sales with optional filtering and pagination
  static async getSales(queryParams: GetSalesQueryType) {
    const { limit, page, sort, filters } = queryParams;

    const query = this.buildOrderQuery(filters);
    const sortOptions = this.buildOrderSort(sort);

    const options = {
      page,
      limit,
      sort: sortOptions,
    };

    const result = await OrderItem.paginate(query, options);

    return result;
  }

  // Get a specific sale by ID
  static async getSaleById(saleId: string) {
    const result = await OrderItem.findById(saleId).lean();
    return result;
  }

  // Update refund status for an order item
  static async updateRefundStatus(saleId: string, refundedQuantity: number) {
    const orderItem = await OrderItem.findById(saleId);
    if (!orderItem) {
      throw createError(404, "Order item not found");
    }

    if (refundedQuantity > orderItem.quantity) {
      throw createError(
        400,
        "Refunded quantity cannot be greater than quantity",
      );
    }

    const newRefundedQuantity = orderItem.refundedQuantity + refundedQuantity;
    const isFullyRefunded = newRefundedQuantity === orderItem.quantity;
    const totalPrice =
      orderItem.unitAmount * (orderItem.quantity - orderItem.refundedQuantity);

    await OrderItem.findByIdAndUpdate(orderItem._id, {
      refundedQuantity: newRefundedQuantity,
      isRefunded: isFullyRefunded,
      totalPrice,
    });
  }

  // ==========================================
  // Sale Query and Sort Operations
  // ==========================================

  private static buildOrderQuery(filters: unknown) {
    const customConfig: FieldConfigMap = {
      productName: { type: FIELD_TYPES.TEXT, searchFields: ["productName"] },
      sellerId: { type: FIELD_TYPES.OBJECT_ID },
      quantity: {
        type: FIELD_TYPES.RANGE,
        minField: "minQuantity",
        maxField: "maxQuantity",
      },
      salePrice: {
        type: FIELD_TYPES.RANGE,
        minField: "minSalePrice",
        maxField: "maxSalePrice",
      },
      totalPrice: {
        type: FIELD_TYPES.RANGE,
        minField: "minTotalPrice",
        maxField: "maxTotalPrice",
      },
      refundedQuantity: {
        type: FIELD_TYPES.RANGE,
        minField: "minRefundedQuantity",
        maxField: "maxRefundedQuantity",
      },
      isRefunded: { type: FIELD_TYPES.BOOLEAN },
    };

    return buildMongoFilter(filters as RawFilters, customConfig);
  }

  private static buildOrderSort(sort: string): Record<string, 1 | -1> {
    const AllowedSortFields = {
      productName: { field: "productName" },
      quantity: { field: "quantity" },
      salePrice: { field: "salePrice" },
      totalPrice: { field: "totalPrice" },
      refundedQuantity: { field: "refundedQuantity" },
    };

    return buildSortQuery(sort, AllowedSortFields);
  }
}
