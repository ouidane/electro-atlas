import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";
import { CartApiResponse } from "@/types";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    //  Get Cart
    getCart: builder.query<CartApiResponse, void>({
      query: () => "/users/me/cart",
      providesTags: ["Cart"],
    }),

    // Add Item (201 + JSON)
    addItemToCart: builder.mutation<
      { message: string },
      { productId: string; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: "/users/me/cart/items",
        method: "POST",
        body: { productId, quantity },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const { productId, quantity } = arg;
            const existing = draft.data.cartItems.find(
              (i) => i.product._id === productId
            );
            const price = existing
              ? existing.product.variant.salePrice!
              : draft.data.cartItems[0]?.product.variant.salePrice!;
            if (existing) {
              existing.quantity += quantity;
              existing.totalPrice += price * quantity;
              existing.totalPriceDecimal = (existing.totalPrice / 100).toFixed(
                2
              );
            }
            draft.data.amount += price * quantity;
            draft.data.totalItems += quantity;
            draft.data.totalProducts = draft.data.cartItems.length;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: ["Cart"],
    }),

    // Update Item (204 No Content)
    updateCartItem: builder.mutation<
      void,
      { productId: string; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `/users/me/cart/items/${productId}`,
        method: "PATCH",
        body: { quantity },
      }),
      transformResponse: () => undefined,
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const { productId, quantity } = arg;
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            const item = draft.data.cartItems.find(
              (i) => i.product._id === productId
            );
            if (!item) return;
            const price = item.product.variant.salePrice!;
            item.quantity = quantity;
            item.totalPrice = price * quantity;
            item.totalPriceDecimal = (item.totalPrice / 100).toFixed(2);
            draft.data.amount = draft.data.cartItems.reduce(
              (sum, i) => sum + i.totalPrice,
              0
            );
            draft.data.totalItems = draft.data.cartItems.reduce(
              (sum, i) => sum + i.quantity,
              0
            );
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: ["Cart"],
    }),

    // Remove Item (204 No Content)
    removeCartItem: builder.mutation<void, { productId: string }>({
      query: ({ productId }) => ({
        url: `/users/me/cart/items/${productId}`,
        method: "DELETE",
      }),
      transformResponse: () => undefined,
      async onQueryStarted({ productId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            draft.data.cartItems = draft.data.cartItems.filter(
              (i) => i.product._id !== productId
            );
            draft.data.amount = draft.data.cartItems.reduce(
              (sum, i) => sum + i.totalPrice,
              0
            );
            draft.data.totalItems = draft.data.cartItems.reduce(
              (sum, i) => sum + i.quantity,
              0
            );
            draft.data.totalProducts = draft.data.cartItems.length;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: ["Cart"],
    }),

    // Clear Cart (204 No Content)
    clearCart: builder.mutation<void, void>({
      query: () => ({ url: "/users/me/cart", method: "PUT" }),
      transformResponse: () => undefined,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          cartApi.util.updateQueryData("getCart", undefined, (draft) => {
            draft.data.cartItems = [];
            draft.data.amount = 0;
            draft.data.totalItems = 0;
            draft.data.totalProducts = 0;
          })
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
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
