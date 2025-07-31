import { ProductVariant } from "./product";

export type ProductCart = {
  _id: string;
  name: string;
  image?: string;
  variant: ProductVariant;
};

export type CartItem = {
  itemId?: string;
  quantity: number;
  totalPrice?: number;
  totalPriceDecimal?: string;
  product: ProductCart;
  createdAt?: string;
  updatedAt?: string;
};

export type Cart = {
  _id: string;
  amount: number;
  amountDecimal?: string;
  totalProducts: number;
  totalItems: number;
  cartItems: CartItem[];
  createdAt?: string;
  updatedAt?: string;
};

export type CartApiResponse = {
  data: Cart;
};
