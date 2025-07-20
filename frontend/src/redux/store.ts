import { configureStore } from "@reduxjs/toolkit";
import { cartApi } from "./features/cart-slice";
import { userApi } from "./features/user-slice";
import { authApi } from "./features/auth-slice";
import { checkoutApi } from "./features/checkout-slice";
import { wishlistApi } from "./features/wishlist-slice";

import authReducer from "./features/auth-slice";
import cartReducer from "./features/cart-slice";
import quickViewReducer from "./features/quickView-slice";
import wishlistReducer from "./features/wishlist-slice";
import productDetailsReducer from "./features/product-details";

import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    cartReducer: cartReducer,
    quickViewReducer: quickViewReducer,
    wishlistReducer: wishlistReducer,
    productDetailsReducer: productDetailsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      cartApi.middleware,
      checkoutApi.middleware,
      wishlistApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
