import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import type { WishlistItem } from "@/types";

type InitialState = {
  wishlistId: string | null;
  userId: string | null;
  itemsCount: number;
  items: WishlistItem[];
};

const initialState: InitialState = {
  wishlistId: null,
  userId: null,
  itemsCount: 0,
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addItemToWishlist(state, action: PayloadAction<WishlistItem>) {
      const newItem = action.payload;
      const exists = state.items.some(
        (item) => item.productId === newItem.productId
      );
      if (!exists) {
        state.items.push(newItem);
        state.itemsCount = state.items.length;
      }
    },
    removeItemFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      state.itemsCount = state.items.length;
    },
    removeAllItemsFromWishlist(state) {
      state.items = [];
      state.itemsCount = 0;
    },
    setWishlist(
      state,
      action: PayloadAction<{
        wishlistId: string;
        userId: string;
        itemsCount: number;
        items: WishlistItem[];
      }>
    ) {
      state.wishlistId = action.payload.wishlistId;
      state.userId = action.payload.userId;
      state.itemsCount = action.payload.itemsCount;
      state.items = action.payload.items;
    },
  },
});

export const {
  addItemToWishlist,
  removeItemFromWishlist,
  removeAllItemsFromWishlist,
  setWishlist,
} = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state: RootState) => state.wishlist.items;
export const selectWishlistCount = (state: RootState) =>
  state.wishlist.itemsCount;

export default wishlistSlice.reducer;
