import { ProductVariant } from "./product";

export type WishlistItem = {
  _id: string;
  productId: string;
  productName: string;
  image: string;
  variant: ProductVariant;
};

export type WishlistApiResponse = {
  data: {
    wishlistId: string;
    userId: string;
    itemsCount: number;
    items: WishlistItem[];
  };
};
