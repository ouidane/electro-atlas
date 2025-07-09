import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from "./baseQueryWithReauth";

export const checkoutApi = createApi({
  reducerPath: 'checkoutApi',
  baseQuery: baseQuery,
  tagTypes: ['Checkout'],
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: () => ({
        url: '/payments/checkout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useCheckoutMutation,
} = checkoutApi;
