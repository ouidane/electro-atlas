import {
  CartItem,
  Cart,
  Product,
  ProductDoc,
  OrderDoc,
  OrderItemDoc,
  ProductVariantDoc,
  CartDoc,
} from "../models";
import { AddItemToCart, GetCartsQueryType } from "../middlewares";
import createError from "http-errors";
import {
  buildMongoFilter,
  buildSortQuery,
  FIELD_TYPES,
  FieldConfigMap,
  RawFilters,
} from "../utils/queryHelpers";
import { Types } from "mongoose";

export type FormattedProductType = {
  _id: string;
  name: string;
  image: string;
  variant: ProductVariantDoc & {
    globalPriceDecimal: number;
    salePriceDecimal?: number;
  };
};

export type FormattedCartItemType = {
  itemId: string;
  quantity: number;
  totalPrice: number;
  totalPriceDecimal: number;
  product: FormattedProductType;
  createdAt: Date;
  updatedAt: Date;
};

export class CartService {
  // Get all carts with pagination and filtering
  static async getCarts(queryParams: GetCartsQueryType) {
    const { limit, page, sort, filters } = queryParams;

    const query = this.buildCartQuery(filters);
    const sortOptions = this.buildCartSort(sort);

    const options = {
      page,
      limit,
      sort: sortOptions,
      populate: [
        {
          path: "cartItems",
          select: "quantity -productId -__v",
          populate: {
            path: "product",
            select: "name variant image",
          },
        },
      ],
      lean: true,
      leanWithId: false,
    };

    const result = await Cart.paginate(query, options);

    return result;
  }

  // Get cart by ID with all items
  static async getCartById(cartId: string) {
    const [cart, cartItems] = await Promise.all([
      this.findCartById(cartId),
      this.getCartItems(cartId),
    ]);
    return { ...cart, cartItems };
  }

  // Get cart by user ID with all items
  static async getCartByUserId(userId: string) {
    let cart: CartDoc | null = await this.findCartByUserId(userId);

    // If not found, create a new cart and convert to plain object
    if (!cart) {
      const newCart = await Cart.create({ userId });
      cart = newCart.toObject();
    }

    const cartItems = await this.getCartItems(cart._id);

    return { ...cart, cartItems };
  }

  // Add item to cart by cart ID
  static async addItemToCart({
    cartId,
    productId,
    quantity = 1,
  }: {
    cartId: string;
    productId: string;
    quantity: number;
  }) {
    await this.validateProductAndVariant({ productId, quantity });
    await this.upsertCartItem({ cartId, productId, quantity });
    await this.updateCartTotals(cartId);
  }

  // Add item to cart by user ID
  static async addItemToMyCart({
    userId,
    productId,
    quantity = 1,
  }: {
    userId: string;
    productId: string;
    quantity: number;
  }) {
    const cart = await this.findCartByUserId(userId);
    if (!cart) {
      throw createError(404, "Cart not found");
    }
    await this.validateProductAndVariant({ productId, quantity });
    await this.upsertCartItem({ cartId: cart._id, productId, quantity });
    await this.updateCartTotals(cart._id);
  }

  // Update item quantity in cart by cart ID
  static async updateItemInCart({
    cartId,
    itemId,
    quantity,
  }: {
    cartId: string;
    itemId: string;
    quantity: number;
  }) {
    const { productId } = await this.getItemById(cartId, itemId);
    await this.validateProductAndVariant({ productId, quantity });
    await this.updateCartItemQuantity({ cartId, itemId, quantity });
    await this.updateCartTotals(cartId);
  }

  // Update item quantity in cart by user ID
  static async updateItemInMyCart({
    userId,
    productId,
    quantity,
  }: {
    userId: string;
    productId: string;
    quantity: number;
  }) {
    const cart = await this.findCartByUserId(userId);
    if (!cart) {
      throw createError(404, "Cart not found");
    }
    await this.validateProductAndVariant({ productId, quantity });
    const item = await this.findCartItemByProductId({
      cartId: cart._id,
      productId,
    });
    await this.updateCartItemQuantity({
      cartId: cart._id,
      itemId: item._id,
      quantity,
    });
    await this.updateCartTotals(cart._id);
  }

  // Remove item from cart by cart ID
  static async deleteItemFromCart({
    cartId,
    itemId,
  }: {
    cartId: string;
    itemId: string;
  }) {
    await this.removeCartItem({ cartId, itemId });
    await this.updateCartTotals(cartId);
  }

  // Remove item from cart by user ID
  static async removeItemFromMyCart({
    userId,
    productId,
  }: {
    userId: string;
    productId: string;
  }) {
    const cart = await this.findCartByUserId(userId);
    if (!cart) {
      throw createError(404, "Cart not found");
    }
    const item = await this.findCartItemByProductId({
      cartId: cart._id,
      productId,
    });
    await this.removeCartItem({ cartId: cart._id, itemId: item._id });
    await this.updateCartTotals(cart._id);
  }

  // Clear all items from cart by cart ID
  static async clearCartById(cartId: string) {
    await this.clearCart(cartId);
  }

  // Clear all items from cart by user ID
  static async clearCartByUserId(userId: string) {
    const cart = await this.findCartByUserId(userId);
    if (!cart) {
      throw createError(404, "Cart not found");
    }
    await this.clearCart(cart._id);
  }

  // Add cart to database with items
  static async addCartToDatabase(cartItems: AddItemToCart[], userId: unknown) {
    const cart = await Cart.create({ userId });
    if (!cartItems || cartItems.length === 0) return;

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product || item.quantity <= 0) {
        continue;
      }

      await CartItem.create({
        quantity: item.quantity,
        productId: item.productId,
        cartId: cart._id,
      });
    }

    await this.updateCartTotals(cart._id);
  }

  // Get formatted cart items
  static async getCartItems(cartId: unknown): Promise<FormattedCartItemType[]> {
    const cartItems: FormattedCartItemType[] = await CartItem.aggregate([
      { $match: { cartId } },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
      {
        $project: this.getCartItemProjection(),
      },
    ]);

    return cartItems;
  }

  // Get item by ID
  static async getItemById(cartId: string, itemId: string) {
    const item = await CartItem.findOne({ _id: itemId, cartId }).lean();
    if (!item) {
      throw createError(404, "Item not found in cart");
    }
    return item;
  }

  // delete items by product Id
  static async deleteItemByProductId(productId: string) {
    await CartItem.deleteMany({ productId });
  }

  // Checks if any product in the order are out of stock
  // and removes them from all other carts (excluding the one just checked out),
  static async handleOutOfStockProduct(
    order: OrderDoc,
    excludeCartId?: string
  ) {
    const operations = [];
    const orderItems = order.orderItems as unknown as OrderItemDoc[];
    const productIds = [
      ...new Set(orderItems.map((item) => item.productId?.toString())),
    ];

    const products = await Product.find(
      { _id: { $in: productIds } },
      { variants: 1 }
    ).lean();

    const productMap = new Map<string, ProductDoc>();
    for (const product of products) {
      productMap.set(product._id.toString(), product);
    }

    for (const item of orderItems) {
      const product = productMap.get(item.productId!.toString());
      if (!product || product.variant.inventory > 0) continue;

      const filter: Record<string, unknown> = {
        productId: item.productId,
      };
      if (excludeCartId) {
        filter.cartId = { $ne: excludeCartId };
      }

      operations.push({
        deleteMany: {
          filter,
        },
      });
    }

    if (operations.length > 0) {
      await CartItem.bulkWrite(operations);
    }
  }

  // ==========================================
  // Cart Query and Sort Operations
  // ==========================================

  private static buildCartQuery(filters: unknown) {
    const customConfig: FieldConfigMap = {
      amount: {
        type: FIELD_TYPES.RANGE,
        minField: "minAmount",
        maxField: "maxAmount",
      },
      totalProducts: {
        type: FIELD_TYPES.RANGE,
        minField: "minTotalProducts",
        maxField: "maxTotalProducts",
      },
      totalItems: {
        type: FIELD_TYPES.RANGE,
        minField: "minTotalItems",
        maxField: "maxTotalItems",
      },
    };

    return buildMongoFilter(filters as RawFilters, customConfig);
  }

  private static buildCartSort(sort: string): Record<string, 1 | -1> {
    const AllowedSortFields = {
      amount: { field: "amount" },
      totalProducts: { field: "totalProducts" },
      totalItems: { field: "totalItems" },
    };

    return buildSortQuery(sort, AllowedSortFields);
  }

  private static getCartItemProjection() {
    return {
      _id: 0,
      itemId: { $toString: "$_id" },
      quantity: 1,
      totalPrice: {
        $multiply: [
          "$quantity",
          {
            $ifNull: [
              "$product.variant.salePrice",
              "$product.variant.globalPrice",
              0,
            ],
          },
        ],
      },
      totalPriceDecimal: {
        $divide: [
          {
            $multiply: [
              "$quantity",
              {
                $ifNull: [
                  "$product.variant.salePrice",
                  "$product.variant.globalPrice",
                  0,
                ],
              },
            ],
          },
          100,
        ],
      },
      product: {
        _id: { $toString: "$product._id" },
        name: 1,
        image: "$product.image.medium",
        variant: {
          $mergeObjects: [
            "$product.variant",
            {
              salePriceDecimal: {
                $cond: {
                  if: { $ne: ["$product.variant.salePrice", null] },
                  then: {
                    $toString: {
                      $round: [
                        { $divide: ["$product.variant.salePrice", 100] },
                        2,
                      ],
                    },
                  },
                  else: null,
                },
              },
              globalPriceDecimal: {
                $toString: {
                  $round: [
                    { $divide: ["$product.variant.globalPrice", 100] },
                    2,
                  ],
                },
              },
              isInStock: {
                $cond: {
                  if: { $gt: ["$product.variant.inventory", 0] },
                  then: true,
                  else: false,
                },
              },
            },
          ],
        },
      },
      createdAt: 1,
      updatedAt: 1,
    };
  }

  // ==========================================
  // Helper/Utility Methods
  // ==========================================

  private static async findCartById(cartId: string) {
    const cart = await Cart.findById(cartId).select("-__v").lean({ virtuals: true });
    if (!cart) {
      throw createError(404, "Cart not found");
    }
    return cart;
  }

  private static async findCartByUserId(userId: string) {
    const cart = await Cart.findOne({ userId }).select("-__v").lean({ virtuals: true });
    if (!cart) return null
    return cart;
  }

  private static async validateProductAndVariant({
    productId,
    quantity,
  }: {
    productId: string | Types.ObjectId;
    quantity: number;
  }) {
    const product = await Product.findById(productId).lean();
    if (!product) {
      throw createError(404, "Product not found");
    }

    if (product.variant.inventory < quantity) {
      throw createError(400, "Product variant out of stock");
    }
  }

  private static async findCartItemByProductId({
    cartId,
    productId,
  }: {
    cartId: unknown;
    productId: string;
  }) {
    const item = await CartItem.findOne({
      productId,
      cartId,
    }).lean();
    if (!item) {
      throw createError(404, "Item not found in cart");
    }
    return item;
  }

  private static async upsertCartItem({
    cartId,
    productId,
    quantity,
  }: {
    cartId: unknown;
    productId: string;
    quantity: number;
  }) {
    const item = await CartItem.findOne({ cartId, productId });

    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      await CartItem.create({ quantity, cartId, productId });
    }
  }

  private static async updateCartItemQuantity({
    cartId,
    itemId,
    quantity,
  }: {
    cartId: unknown;
    itemId: unknown;
    quantity: number;
  }) {
    const item = await CartItem.findOne({ _id: itemId, cartId });
    if (!item) {
      throw createError(404, "Item not found in cart");
    }

    if (quantity === 0) {
      await CartItem.findByIdAndDelete(itemId);
    } else {
      item.quantity = quantity;
      await item.save();
    }
  }

  private static async removeCartItem({
    cartId,
    itemId,
  }: {
    cartId: unknown;
    itemId: unknown;
  }) {
    const item = await CartItem.findOneAndDelete({
      _id: itemId,
      cartId,
    }).lean();
    if (!item) {
      throw createError(404, "Item not found in cart");
    }
  }

  private static async updateCartTotals(cartId: unknown) {
    const cartItems = await CartItem.find({ cartId })
      .populate("productId")
      .lean();

    const totalItems = cartItems.length;
    const totalProducts = cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    const totalPrice = cartItems.reduce((acc, item) => {
      const product = item.productId as unknown as ProductDoc;
      const variant = product.variant;
      return acc + item.quantity * (variant.salePrice || variant.globalPrice);
    }, 0);

    await Cart.findByIdAndUpdate(cartId, {
      amount: totalPrice,
      totalItems,
      totalProducts,
    });
  }

  private static async clearCart(cartId: unknown) {
    await Promise.all([
      CartItem.deleteMany({ cartId }),
      Cart.findByIdAndUpdate(cartId, {
        amount: 0,
        totalItems: 0,
        totalProducts: 0,
      }),
    ]);
  }
}
