import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { CartItem } from "@/types";

type InitialState = {
  items: CartItem[];
};

const initialState: InitialState = {
  items: [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.product._id === newItem.product._id
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
        existingItem.totalPrice += newItem.totalPrice;
        existingItem.totalPriceDecimal = (
          (existingItem.totalPrice + newItem.totalPrice) /
          100
        ).toFixed(2);
      } else {
        state.items.push(newItem);
      }
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      const ProductId = action.payload;
      state.items = state.items.filter(
        (item) => item.product._id !== ProductId
      );
    },

    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ ProductId: string; quantity: number }>
    ) => {
      const { ProductId, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product._id === ProductId
      );
      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.totalPrice =
          existingItem.product.variant.salePrice * quantity;
        existingItem.totalPriceDecimal = (
          (existingItem.product.variant.salePrice * quantity) /
          100
        ).toFixed(2);
      }
    },

    removeAllItemsFromCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  removeAllItemsFromCart,
} = cart.actions;
export const selectCartItems = (state: RootState) => state.cartReducer.items;
export const selectTotalPrice = createSelector([selectCartItems], (items) => {
  const totalPrice = items.reduce((total, item) => {
    return total + item.product.variant.salePrice * item.quantity;
  }, 0);
  return (totalPrice / 100).toFixed(2);
});
export default cart.reducer;

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/users/me/cart",
      providesTags: ["Cart"],
    }),
    addItemToCart: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: "/users/me/cart/items",
        method: "POST",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCartItem: builder.mutation({
      query: ({ productId, quantity }) => ({
        url: `/users/me/cart/items/${productId}`,
        method: "PATCH",
        body: { quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCartItem: builder.mutation({
      query: ({ productId }) => ({
        url: `/users/me/cart/items/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: "/users/me/cart",
        method: "PUT",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddItemToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} = cartApi;
