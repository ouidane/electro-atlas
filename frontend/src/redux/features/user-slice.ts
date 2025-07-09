import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => '/users/me',
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({
        familyName,
        givenName,
        phone,
        address: { line1, line2, city, country, postalCode },
      }) => ({
        url: '/users/me',
        method: 'PATCH',
        body: {
          familyName,
          givenName,
          phone,
          address: {
            line1,
            line2,
            // line2: line2 ? line2 : undefined,
            city,
            country,
            postalCode,
          },
        },
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
} = userApi;
