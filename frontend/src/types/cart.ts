import { ProductVariant } from "./product";

type Product = {
  _id: string;
  name: string;
  image: string;
  variant: ProductVariant;
};

export type CartItem = {
  quantity: number;
  totalPrice?: number;
  totalPriceDecimal?: string;
  product: Product;
};
