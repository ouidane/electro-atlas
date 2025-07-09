import { Types } from "mongoose";
import { Order, OrderItem } from "../models";
import { ORDER_STATUS } from "../utils/constants";
import { CartService } from "./cartService";
import Stripe from "stripe";
import createError from "http-errors";
import { GetMyOrdersQueryType, GetOrdersQueryType } from "../middlewares";
import {
  buildMongoFilter,
  buildSortQuery,
  FIELD_TYPES,
  FieldConfigMap,
  RawFilters,
} from "../utils/queryHelpers";

export class OrderService {
  // Get orders for a specific buyer with pagination
  static async getBuyerOrders(
    userId: string,
    queryParams: GetMyOrdersQueryType
  ) {
    const { page, limit } = queryParams;
    const options = {
      page,
      limit,
      sort: { createdAt: 1 },
      populate: {
        path: "orderItems",
        select: "-__v",
      },
      lean: true,
    };

    const result = await Order.paginate({ userId }, options);

    return result;
  }

  // Get all orders with optional filtering and pagination
  static async getOrders(queryParams: GetOrdersQueryType) {
    const { limit, page, sort, filters } = queryParams;

    const query = this.buildOrderQuery(filters);
    const sortOptions = this.buildOrderSort(sort);

    const options = {
      page,
      limit,
      sort: sortOptions,
      populate: {
        path: "orderItems",
        select: "-__v",
      },
      lean: true,
    };

    const result = await Order.paginate(query, options);

    return result;
  }

  // Get a single order by ID
  static async getOrderById(orderId: unknown) {
    const order = await Order.findById(orderId)
      .populate({
        path: "orderItems",
        select: "-__v",
        options: { lean: { virtuals: true } },
      })
      .select("-__v")
      .lean({ virtuals: true });

    if (!order) {
      throw createError(404, "Order not found");
    }

    return order;
  }

  // Create a new order from a Stripe checkout session
  static async createOrder({
    paymentId,
    session,
  }: {
    paymentId: unknown;
    session: Stripe.Checkout.Session;
  }) {
    const cartId = session.metadata!.cartId;
    const userId = session.metadata!.userId;
    const totalAmount = session.amount_total;
    const cartItems = await CartService.getCartItems(cartId);

    if (!cartItems || cartItems.length === 0) {
      throw createError(404, "Cart is empty");
    }

    const order = await Order.create({
      userId,
      paymentId,
      totalAmount,
      orderStatus: ORDER_STATUS.CREATED,
    });

    const orderItems = cartItems.map((item) => ({
      productId: item.product._id,
      orderId: order._id,
      quantity: item.quantity,
      unitAmount: item.product.variant.salePrice
        ? item.product.variant.salePrice
        : item.product.variant.globalPrice,
      totalPrice: item.totalPrice,
      productName: item.product.name,
      image: item.product.image,
    }));

    await OrderItem.insertMany(orderItems);
    const updatedOrder = await this.updateOrderById(order._id);
    return updatedOrder;
  }

  // Update an existing order by ID
  static async updateOrderById(orderId: unknown) {
    const order = await Order.findById(orderId);
    if (!order) {
      throw createError(404, "Order not found");
    }

    const orderItems = await OrderItem.find({ orderId }).lean();
    if (!orderItems || orderItems.length === 0) {
      throw createError(404, "Order items not found");
    }

    let total = 0;
    for (const item of orderItems) {
      total += item.unitAmount * item.quantity;
    }

    total += order.shippingAmount - order.discountAmount;

    order.orderItems = orderItems.map((item) => item._id as Types.ObjectId);
    order.totalAmount = total;
    await order.save();

    const updatedOrder = await this.getOrderById(orderId);

    return updatedOrder;
  }

  // Update the status of an order
  static async updateOrderStatus(orderId: string, newStatus: string) {
    await Order.findByIdAndUpdate(orderId, { orderStatus: newStatus });
  }

  // ==========================================
  // Order Query and Sort Operations
  // ==========================================

  private static buildOrderQuery(filters: unknown) {
    const customConfig: FieldConfigMap = {
      orderStatus: { type: FIELD_TYPES.EXACT },
      userId: { type: FIELD_TYPES.OBJECT_ID },
      totalAmount: {
        type: FIELD_TYPES.RANGE,
        minField: "minAmount",
        maxField: "maxAmount",
      },
      shippingAmount: {
        type: FIELD_TYPES.RANGE,
        minField: "minShippingAmount",
        maxField: "maxShippingAmount",
      },
      discountAmount: {
        type: FIELD_TYPES.RANGE,
        minField: "minDiscountAmount",
        maxField: "maxDiscountAmount",
      },
    };

    return buildMongoFilter(filters as RawFilters, customConfig);
  }

  private static buildOrderSort(sort: string): Record<string, 1 | -1> {
    const AllowedSortFields = {
      amount: { field: "totalAmount" },
      shippingAmount: { field: "shippingAmount" },
      discountAmount: { field: "discountAmount" },
    };

    return buildSortQuery(sort, AllowedSortFields);
  }
}
