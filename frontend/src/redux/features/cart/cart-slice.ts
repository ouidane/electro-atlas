import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store";
import type { CartItem } from "@/types";

type InitialState = {
  cartItems: CartItem[];
};

const initialState: InitialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<CartItem>) {
      const newItem = action.payload;
      const existing = state.cartItems.find(
        (item) => item.product._id === newItem.product._id
      );
      if (existing) {
        existing.quantity += newItem.quantity;
        existing.totalPrice += newItem.totalPrice!;
        existing.totalPriceDecimal = (existing.totalPrice / 100).toFixed(2);
      } else {
        state.cartItems.push(newItem);
      }
    },

    removeItemFromCart(state, action: PayloadAction<string>) {
      state.cartItems = state.cartItems.filter(
        (item) => item.product._id !== action.payload
      );
    },

    updateCartItemQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>
    ) {
      const { productId, quantity } = action.payload;
      const item = state.cartItems.find((i) => i.product._id === productId);
      if (item) {
        const price = item.product.variant.salePrice;
        item.quantity = quantity;
        item.totalPrice = price! * quantity;
        item.totalPriceDecimal = (item.totalPrice / 100).toFixed(2);
      }
    },

    removeAllItemsFromCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
} = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.cartItems;
export const selectTotalPrice = createSelector([selectCartItems], (items) => {
  const sum = items.reduce(
    (acc, i) => acc + i.product.variant.salePrice! * i.quantity,
    0
  );
  return (sum / 100).toFixed(2);
});

export default cartSlice.reducer;
