import { createApi } from "@reduxjs/toolkit/query/react";
import type { WishlistApiResponse, WishlistItem } from "@/types";
import { baseQueryWithReauth } from "../baseQueryWithReauth";

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    // Fetch current wishlist
    getWishlist: builder.query<WishlistApiResponse, void>({
      query: () => "/users/me/wishlist",
      providesTags: ["Wishlist"],
    }),

    // Add an item (201 + JSON)
    addItemToWishlist: builder.mutation<
      { message: string },
      { productId: string; itemData: Omit<WishlistItem, "_id"> }
    >({
      query: ({ productId }) => ({
        url: "/users/me/wishlist/items",
        method: "POST",
        body: { productId },
      }),
      async onQueryStarted(
        { productId, itemData },
        { dispatch, queryFulfilled }
      ) {
        const patch = dispatch(
          wishlistApi.util.updateQueryData(
            "getWishlist",
            undefined,
            (draft) => {
              draft.data.items.push({
                _id: undefined as any,
                productId,
                productName: itemData.productName,
                image: itemData.image,
                variant: itemData.variant,
              });
              draft.data.itemsCount += 1;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: ["Wishlist"],
    }),

    // Remove an item (204 No Content)
    removeItemFromWishlist: builder.mutation<void, { productId: string }>({
      query: ({ productId }) => ({
        url: `/users/me/wishlist/items/${productId}`,
        method: "DELETE",
      }),
      transformResponse: () => undefined,
      async onQueryStarted({ productId }, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          wishlistApi.util.updateQueryData(
            "getWishlist",
            undefined,
            (draft) => {
              draft.data.items = draft.data.items.filter(
                (i) => i.productId !== productId
              );
              draft.data.itemsCount = draft.data.items.length;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: ["Wishlist"],
    }),

    // Clear wishlist (204 No Content)
    clearWishlist: builder.mutation<void, void>({
      query: () => ({ url: "/users/me/wishlist", method: "PUT" }),
      transformResponse: () => undefined,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const patch = dispatch(
          wishlistApi.util.updateQueryData(
            "getWishlist",
            undefined,
            (draft) => {
              draft.data.items = [];
              draft.data.itemsCount = 0;
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patch.undo();
        }
      },
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddItemToWishlistMutation,
  useRemoveItemFromWishlistMutation,
  useClearWishlistMutation,
} = wishlistApi;
