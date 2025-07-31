import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQueryWithReauth";

export const authStatusApi = createApi({
  reducerPath: "authStatusApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    authStatus: builder.query<
      {
        authenticated: boolean;
        user: { id: string; role: string };
      },
      void
    >({
      query: () => ({
        url: "/auth/status",
        method: "GET",
      }),
    }),
  }),
});

export const { useAuthStatusQuery } = authStatusApi;
