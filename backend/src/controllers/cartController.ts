import { Request, Response, NextFunction } from "express";
import { CartService } from "../services/cartService";
import { GetCartsQueryType } from "../middlewares/validateCart";
import paginateResponse from "../utils/paginateResponse";

class CartController {
  // Get carts
  async getCarts(req: Request, res: Response, next: NextFunction) {
    const queryParams = req.parsedQuery as GetCartsQueryType;
    const baseUrl = `${req.baseUrl}${req.path}`;

    const result = await CartService.getCarts(queryParams);
    const resultWithPagination = paginateResponse(result, queryParams, baseUrl);
    res.status(200).json(resultWithPagination);
  }

  async getCartByUserId(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const data = await CartService.getCartByUserId(userId);
    res.status(200).json({ data });
  }

  async addItemToMyCart(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const { productId, quantity = 1 } = req.body;
    await CartService.addItemToMyCart({ userId, productId, quantity });
    res.status(201).json({ message: "Cart item added successfully" });
  }

  async updateItemInMyCart(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const { productId } = req.params;
    const { quantity } = req.body;
    await CartService.updateItemInMyCart({ userId, productId, quantity });
    res.sendStatus(204);
  }

  async removeItemFromMyCart(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const { productId } = req.params;
    await CartService.removeItemFromMyCart({ userId, productId });
    res.sendStatus(204);
  }

  async clearMyCart(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id as string;
    await CartService.clearCartByUserId(userId);
    res.sendStatus(204);
  }

  // Get Cart By Id
  async getCartById(req: Request, res: Response, next: NextFunction) {
    const { cartId } = req.params;
    const data = await CartService.getCartById(cartId);
    res.status(200).json({ data });
  }

  // Get Item By Id
  async getItemById(req: Request, res: Response, next: NextFunction) {
    const { cartId, itemId } = req.params;
    const data = await CartService.getItemById(cartId, itemId);
    res.status(200).json({ data });
  }

  // Add item to cart
  async addItemToCart(req: Request, res: Response, next: NextFunction) {
    const { cartId } = req.params;
    const { productId, quantity = 1 } = req.body;
    await CartService.addItemToCart({ cartId, productId, quantity });
    res.status(201).json({ message: "Cart item added successfully" });
  }

  // Update item in cart
  async updateItemInCart(req: Request, res: Response, next: NextFunction) {
    const { cartId, itemId } = req.params;
    const quantity = Number(req.body.quantity);
    await CartService.updateItemInCart({ cartId, itemId, quantity });
    res.sendStatus(204);
  }

  // Remove item in cart
  async removeItemFromCart(req: Request, res: Response, next: NextFunction) {
    const { cartId, itemId } = req.params;
    await CartService.deleteItemFromCart({ cartId, itemId });
    res.sendStatus(204);
  }

  // Delete all items in cart
  async clearCart(req: Request, res: Response, next: NextFunction) {
    const { cartId } = req.params;
    await CartService.clearCartById(cartId);
    res.sendStatus(204);
  }
}

export const cartController = new CartController();
