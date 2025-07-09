import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./features/cart-slice";
import { userApi } from "./features/user-slice";
import { authApi } from "./features/auth-slice";
import { checkoutApi } from "./features/checkout-slice";

import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import productDetailsReducer from "./features/product-details";

import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    cartReducer: cartReducer,
    quickViewReducer: quickViewReducer,
    wishlistReducer: wishlistReducer,
    productDetailsReducer: productDetailsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      cartApi.middleware,
      authApi.middleware,
      userApi.middleware,
      checkoutApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
