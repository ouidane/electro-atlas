import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

// Basic base query with credentials
export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: 'include', // ⬅️ Important: send cookies for refresh
  prepareHeaders: (headers) => {
    const token = typeof window !== 'undefined' && localStorage.getItem('accessToken');
    if (token) headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

// Wrapper to handle 403 and refresh token
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 403) {
    console.warn('Access token expired. Trying to refresh token...');

    // Attempt to refresh token
    const refreshResult = await baseQuery(
      {
        url: '/auth/refresh-token',
        method: 'POST',
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as any).accessToken;

      // Save new token
      localStorage.setItem('accessToken', newAccessToken);

      // Retry the original request with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.warn('Token refresh failed. Logging out...');
      localStorage.removeItem('accessToken');
      // optionally dispatch logout or redirect
    }
  }

  return result;
};
