import { createApi } from "@reduxjs/toolkit/query/react";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { baseQuery } from "./api";

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = { accessToken: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
    },
    logout: (state) => {
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: ({
        email,
        password,
        confirmPassword,
      }: {
        email: string;
        password: string;
        confirmPassword: string;
      }) => ({
        url: "/auth/register",
        method: "POST",
        body: { email, password, confirmPassword },
      }),
    }),
    signin: builder.mutation({
      query: ({ email, password }: { email?: string; password?: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useSignupMutation, useSigninMutation, useLogoutMutation } =
  authApi;
