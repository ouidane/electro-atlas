import { Request, Response } from "express";
import { OrderService } from "../services/orderService";
import paginateResponse from "../utils/paginateResponse";
import { GetMyOrdersQueryType, GetOrdersQueryType } from "../middlewares";

class OrderController {
  // Get my orders
  async getMyOrders(req: Request, res: Response) {
    const userId = req.user!.id;
    const queryParams = req.parsedQuery as GetMyOrdersQueryType;
    const baseUrl = `${req.baseUrl}${req.path}`;

    const result = await OrderService.getBuyerOrders(userId, queryParams);
    const resultWithPagination = paginateResponse(result, queryParams, baseUrl);
    res.status(200).json(resultWithPagination);
  }

  // Get all orders
  async getOrders(req: Request, res: Response) {
    const queryParams = req.parsedQuery as GetOrdersQueryType;
    const baseUrl = `${req.baseUrl}${req.path}`;

    const result = await OrderService.getOrders(queryParams);
    const resultWithPagination = paginateResponse(result, queryParams, baseUrl);
    res.status(200).json(resultWithPagination);
  }

  // Get order by id
  async getOrderById(req: Request, res: Response) {
    const { orderId } = req.params;
    const data = await OrderService.getOrderById(orderId);

    res.status(200).json({ data });
  }

  async updateOrderStatus(req: Request, res: Response) {
    const { orderId } = req.params;
    const newStatus = req.body.status as string;
    await OrderService.updateOrderStatus(orderId, newStatus);

    res.sendStatus(204);
  }
}

export const orderController = new OrderController();
