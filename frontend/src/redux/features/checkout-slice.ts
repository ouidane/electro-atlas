import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Checkout"],
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: () => ({
        url: "/payments/checkout",
        method: "POST",
      }),
    }),
  }),
});

export const { useCheckoutMutation } = checkoutApi;
