import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";
import { WishlistApiResponse, WishlistItem } from "@/types";

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

export const wishlist = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (
      state,
      action: PayloadAction<{
        wishlistId: string;
        userId: string;
        itemsCount: number;
        items: WishlistItem[];
      }>
    ) => {
      state.wishlistId = action.payload.wishlistId;
      state.userId = action.payload.userId;
      state.itemsCount = action.payload.itemsCount;
      state.items = action.payload.items;
    },
    addItemToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const newItem = action.payload;
      const exists = state.items.some(
        (item) => item.productId === newItem.productId
      );

      if (!exists) {
        state.items.push(newItem);
        state.itemsCount += 1;
      }
    },
    removeItemFromWishlist: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      state.itemsCount = state.items.length;
    },
    removeAllItemsFromWishlist: (state) => {
      state.items = [];
      state.itemsCount = 0;
    },
  },
});

export const {
  setWishlist,
  addItemToWishlist,
  removeItemFromWishlist,
  removeAllItemsFromWishlist,
} = wishlist.actions;
export default wishlist.reducer;

export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    getWishlist: builder.query<WishlistApiResponse, void>({
      query: () => "/users/me/wishlist",
      providesTags: ["Wishlist"],
    }),
    addItemToWishlist: builder.mutation({
      query: ({ productId }) => ({
        url: "/users/me/wishlist/items",
        method: "POST",
        body: { productId },
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeItemFromWishlist: builder.mutation({
      query: ({ productId }) => ({
        url: `/users/me/wishlist/items/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    clearWishlist: builder.mutation({
      query: () => ({
        url: "/users/me/wishlist",
        method: "PUT",
      }),
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
