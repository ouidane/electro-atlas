import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signup: builder.mutation<
      { messaage: string },
      { email: string; password: string; confirmPassword: string }
    >({
      query: ({ email, password, confirmPassword }) => ({
        url: "/auth/register",
        method: "POST",
        body: { email, password, confirmPassword },
      }),
    }),
    signin: builder.mutation<
      { accessToken: string },
      { email: string; password: string }
    >({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    refreshToken: builder.query<{ accessToken: string }, void>({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useLogoutMutation,
  useRefreshTokenQuery,
} = authApi;
