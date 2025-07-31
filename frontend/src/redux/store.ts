import { configureStore } from "@reduxjs/toolkit";

// RTK Query APIs
import { authStatusApi } from "./features/auth/auth-status-api";
import { authApi } from "./features/auth/auth-api";
import { cartApi } from "./features/cart/cart-api";
import { userApi } from "./features/user-slice";
import { checkoutApi } from "./features/checkout-slice";
import { wishlistApi } from "./features/wishlist/wishlist-api";
import { discoverApi } from "./features/discover/discover-api";
// Reducers
import authReducer from "./features/auth/auth-slice";
import cartReducer from "./features/cart/cart-slice";
import quickViewReducer from "./features/quickView-slice";
import wishlistReducer from "./features/wishlist/wishlist-slice";
import productDetailsReducer from "./features/product-details";

// Typed selector
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    quickView: quickViewReducer,
    wishlist: wishlistReducer,
    productDetails: productDetailsReducer,
    [authStatusApi.reducerPath]: authStatusApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [checkoutApi.reducerPath]: checkoutApi.reducer,
    [wishlistApi.reducerPath]: wishlistApi.reducer,
    [discoverApi.reducerPath]: discoverApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authStatusApi.middleware,
      authApi.middleware,
      userApi.middleware,
      cartApi.middleware,
      checkoutApi.middleware,
      wishlistApi.middleware,
      discoverApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
