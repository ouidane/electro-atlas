import { createSlice } from "@reduxjs/toolkit";
import { setCredentials, logout } from "./auth-actions";

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCredentials, (state, action) => {
        state.accessToken = action.payload.accessToken;
      })
      .addCase(logout, (state) => {
        state.accessToken = null;
      });
  },
});

export default authSlice.reducer;
