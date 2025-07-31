import { createAction } from "@reduxjs/toolkit";

export const setCredentials = createAction<{ accessToken: string }>(
  "auth/setCredentials"
);
export const logout = createAction("auth/logout");
