import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import type { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authReducer.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});
