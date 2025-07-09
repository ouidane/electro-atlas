import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProductVariant = {
  variation: string;
  sku: string;
  color: string;
  inventory: number;
  globalPrice: number;
  globalPriceDecimal: string;
  salePrice: number;
  salePriceDecimal: string;
  discountPercent: number;
  saleStartDate: string;
};

type WishlistItem = {
  _Id: string;
  productId: string;
  productName: string;
  image: string;
  variant: ProductVariant;
};

type InitialState = {
  items: WishlistItem[];
};

const initialState: InitialState = {
  items: [],
};

export const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const newItem = action.payload;
      const exists = state.items.some(
        (item) => item.productId === newItem.productId
      );

      if (!exists) {
        state.items.push(newItem);
      }
    },

    removeItemFromWishlist: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
    },

    removeAllItemsFromWishlist: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItemToWishlist,
  removeItemFromWishlist,
  removeAllItemsFromWishlist,
} = wishlist.actions;

export default wishlist.reducer;
