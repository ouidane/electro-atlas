import createError from "http-errors";
import { Wishlist, Product, ProductDoc, WishlistDoc } from "../models";
import { AddItemWishlist } from "../middlewares/validateWishlist";
import { FlattenMaps, Types } from "mongoose";

export class WishlistService {
  private static async findWishlist(query: {
    _id?: unknown;
    userId?: unknown;
  }) {
    const wishlist = await Wishlist.findOne(query).populate({
      path: "items.product",
      select: "_id name image variant",
    });
    console.log("wishlist", wishlist);
    return wishlist;
  }

  private static async validateProductAndVariant(productId: string) {
    const product = await Product.findById(productId);
    if (!product) {
      throw createError(404, "Product not found");
    }

    if (!product.variant) {
      throw createError(404, "Product variant not found");
    }
  }

  private static formatWishlistItems(
    wishlist: FlattenMaps<WishlistDoc> | WishlistDoc
  ) {
    return wishlist.items.map((item) => {
      const product = item.product as unknown as ProductDoc;
      const variant = product.variant;
      return {
        _Id: wishlist._id,
        productId: product._id,
        productName: product.name,
        image: product.image?.medium,
        variant: {
              variation: variant.variation,
              sku: variant.sku,
              color: variant.color,
              inventory: variant.inventory,
              globalPrice: variant.globalPrice,
              globalPriceDecimal: (variant.globalPrice / 100).toFixed(2),
              salePrice: variant.salePrice,
              salePriceDecimal: variant.salePrice ? (variant.salePrice / 100).toFixed(2) : null,
              discountPercent: variant.discountPercent,
              saleStartDate: variant.saleStartDate,
            }
      };
    });
  }

  private static async addItemToWishlistHelper(
    wishlist: WishlistDoc,
    productId: string
  ) {
    if (wishlist.items.some((item) => item.product?.toString() === productId)) {
      throw createError(409, "Product already in wishlist");
    }

    wishlist.items.push({ product: new Types.ObjectId(productId) });
    await wishlist.save();
  }

  private static async deleteItemFromWishlistHelper(
    wishlist: WishlistDoc,
    productId: string
  ) {
    const itemIndex = wishlist.items.findIndex(
      (item) => item.product?.toString() === productId
    );
    if (itemIndex === -1) {
      throw createError(404, "Item not found in wishlist");
    }

    wishlist.items.splice(itemIndex, 1);
    await wishlist.save();
  }

  static async getWishlists(userId: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const wishlists = await Wishlist.find({ userId })
      .populate({
        path: "items.product",
        select: "_id name image variant",
      })
      .sort({ createdAt: "desc" })
      .skip(skip)
      .limit(limit)
      .lean();

    const formattedWishlists = wishlists.map((wishlist) => ({
      userId: wishlist.userId,
      itemsCount: wishlist.items.length,
      items: this.formatWishlistItems(wishlist),
    }));

    return formattedWishlists;
  }

  static async getWishlistById(wishlistId: string) {
    const wishlist = await this.findWishlist({ _id: wishlistId });

    if (!wishlist) {
      throw createError(404, "Wishlist not found");
    }

    return {
      wishlistId: wishlist._id,
      userId: wishlist.userId,
      itemsCount: wishlist.items.length,
      items: this.formatWishlistItems(wishlist),
    };
  }

  static async getWishlistByUserId(userId: string) {
    let wishlist: WishlistDoc | null = await this.findWishlist({ userId });

    if (!wishlist) {
      const newWishlist = await Wishlist.create({ userId });
      wishlist = newWishlist.toObject();
    }

    return {
      wishlistId: wishlist._id,
      userId: wishlist.userId,
      itemsCount: wishlist.items.length,
      items: this.formatWishlistItems(wishlist),
    };
  }

  static async addItemToWishlist({
    wishlistId,
    productId,
  }: {
    wishlistId: string;
    productId: string;
  }) {
    await this.validateProductAndVariant(productId);
    const wishlist = await this.findWishlist({ _id: wishlistId });
    if (!wishlist) {
      throw createError(404, "Wishlist not found");
    }
    await this.addItemToWishlistHelper(wishlist, productId);
  }

  static async addItemToMyWishlist({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) {
    await this.validateProductAndVariant(productId);
    const wishlist = await this.findWishlist({ userId });
    if (!wishlist) {
      throw createError(404, "Wishlist not found");
    }
    await this.addItemToWishlistHelper(wishlist, productId);
  }

  static async addWishlistToDatabase(
    items: AddItemWishlist[],
    userId: unknown
  ) {
    const wishlist = await Wishlist.create({ userId });

    if (!items || items.length === 0) {
      return;
    }

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        continue;
      }

      wishlist.items.push({ product: new Types.ObjectId(item.productId) });
    }

    await wishlist.save();
  }

  // =============== Public Methods - Delete Operations ===============

  static async deleteItemFromWishlist({
    wishlistId,
    productId,
  }: {
    wishlistId: string;
    productId: string;
  }) {
    const wishlist = await this.findWishlist({ _id: wishlistId });
    if (!wishlist) {
      throw createError(404, "Wishlist not found");
    }
    await this.deleteItemFromWishlistHelper(wishlist, productId);
  }

  static async deleteItemFromMyWishlist({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) {
    const wishlist = await this.findWishlist({ userId });
    if (!wishlist) {
      throw createError(404, "Wishlist not found");
    }
    await this.deleteItemFromWishlistHelper(wishlist, productId);
  }

  static async clearWishlistByUserId(userId: string) {
    const wishlist = await this.findWishlist({ userId });
    if (!wishlist) {
      throw createError(404, "Wishlist not found");
    }
    wishlist.items.splice(0, wishlist.items.length);
    await wishlist.save();
  }

  static async clearWishlistById(wishlistId: string) {
    const wishlist = await this.findWishlist({ _id: wishlistId });
    if (!wishlist) {
      throw createError(404, "Wishlist not found");
    }
    wishlist.items.splice(0, wishlist.items.length);
    await wishlist.save();
  }
}
