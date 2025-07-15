import { Request, Response, NextFunction } from "express";
import { WishlistService } from "../services/wishlistService";

class WishlistController {
  // Get wishlists
  async getWishlists(req: Request, res: Response) {
    const userId = req.user!.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const data = await WishlistService.getWishlists(userId, page, limit);
    res.status(200).json({ data });
  }

  async getWishlistByUserId(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const data = await WishlistService.getWishlistByUserId(userId);
    res.status(200).json({ data });
  }

  async addItemToMyWishlist(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const { productId } = req.body;
    await WishlistService.addItemToMyWishlist({ userId, productId });
    res.status(201).json({ message: "Item added to wishlist successfully" });
  }

  async removeItemFromMyWishlist(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const { productId } = req.params;
    await WishlistService.deleteItemFromMyWishlist({ userId, productId });
    res.sendStatus(204);
  }

  async clearMyWishlist(req: Request, res: Response) {
    const userId = req.user?.id as string;
    await WishlistService.clearWishlistByUserId(userId);
    res.sendStatus(204);
  }

  // Get wishlist by id
  async getWishlistById(req: Request, res: Response) {
    const { wishlistId } = req.params;
    const data = await WishlistService.getWishlistById(wishlistId);
    res.status(200).json({ data });
  }

  // Add item to wishlist
  async addItemToWishlist(req: Request, res: Response) {
    const { wishlistId } = req.params;
    const { productId } = req.body;
    await WishlistService.addItemToWishlist({ wishlistId, productId });
    res.status(201).json({ message: "Item added to wishlist successfully" });
  }

  // Delete item from wishlist
  async deleteItemFromWishlist(req: Request, res: Response) {
    const { wishlistId } = req.params;
    const { productId } = req.body;
    await WishlistService.deleteItemFromWishlist({ wishlistId, productId });
    res.sendStatus(204);
  }

  async clearWishlist(req: Request, res: Response) {
    const { wishlistId } = req.params;
    await WishlistService.clearWishlistById(wishlistId);
    res.sendStatus(204);
  }
}

export const wishlistController = new WishlistController();
