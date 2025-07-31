import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsLoggedIn } from "./useIsLoggedIn";
import {
  useGetCartQuery,
  useAddItemToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useClearCartMutation,
} from "@/redux/features/cart/cart-api";
import {
  addItemToCart as addGuestItem,
  removeItemFromCart as removeGuestItem,
  updateCartItemQuantity as updateGuestQuantity,
  removeAllItemsFromCart as clearGuestCart,
  selectCartItems as selectGuestItems,
  selectTotalPrice as selectGuestTotal,
} from "@/redux/features/cart/cart-slice";
import type { CartItem, Product, ProductCart } from "@/types";

export function useCart() {
  const { isLoggedIn: isAuth, loading: isAuthLoading } = useIsLoggedIn();
  const dispatch = useDispatch();

  // Server-side cart (logged-in)
  const {
    data: serverResponse,
    isLoading: cartLoading,
    refetch: refetchServerCart,
  } = useGetCartQuery(undefined, { skip: !isAuth });
  const [addServerItem, { isLoading: addItemLoadingServer }] =
    useAddItemToCartMutation();
  const [updateServerItem, { isLoading: updateItemLoadingServer }] =
    useUpdateCartItemMutation();
  const [removeServerItem, { isLoading: removeItemLoadingServer }] =
    useRemoveCartItemMutation();
  const [clearServer, { isLoading: clearCartLoadingServer }] =
    useClearCartMutation();

  // Guest cart (local slice)
  const guestItems = useSelector(selectGuestItems);
  const guestTotal = useSelector(selectGuestTotal);

  // Determine current cart
  const items: CartItem[] = isAuth
    ? serverResponse?.data.cartItems ?? []
    : guestItems;
  const totalPrice: string = isAuth
    ? serverResponse?.data.amountDecimal ??
      ((serverResponse?.data.amount ?? 0) / 100).toFixed(2)
    : guestTotal;

  // Helpers
  function buildGuestItem(product: Product, quantity: number): CartItem {
    const price = product.variant.salePrice ?? product.variant.globalPrice;
    const total = price * quantity;
    return {
      product: { ...product, image: product.image.tiny },
      quantity,
      totalPrice: total,
      totalPriceDecimal: (total / 100).toFixed(2),
    };
  }

  // Cart logic helpers
  function currentCartQuantity(productId: string): number {
    return items.find((item) => item.product._id === productId)?.quantity || 0;
  }

  function maxAvailableQuantity(product: Product | ProductCart): number {
    return product.variant.inventory - currentCartQuantity(product._id);
  }

  const addItem = useCallback(
    (product: Product, quantity: number) => {
      if (isAuth) {
        addServerItem({ productId: product._id, quantity });
      } else {
        const newItem = buildGuestItem(product, quantity);
        dispatch(addGuestItem(newItem));
      }
    },
    [isAuth, addServerItem, dispatch]
  );

  const updateItem = useCallback(
    (productId: string, quantity: number) => {
      if (isAuth) {
        updateServerItem({ productId, quantity });
      } else {
        dispatch(updateGuestQuantity({ productId: productId, quantity }));
      }
    },
    [isAuth, updateServerItem, dispatch]
  );

  const removeItem = useCallback(
    (productId: string) => {
      if (isAuth) {
        removeServerItem({ productId });
      } else {
        dispatch(removeGuestItem(productId));
      }
    },
    [isAuth, removeServerItem, dispatch]
  );

  const clearCart = useCallback(() => {
    if (isAuth) {
      clearServer();
    } else {
      dispatch(clearGuestCart());
    }
  }, [isAuth, clearServer, dispatch]);

  return {
    isLoading:
      addItemLoadingServer ||
      updateItemLoadingServer ||
      removeItemLoadingServer ||
      clearCartLoadingServer,
    isAuthenticated: Boolean(isAuth),
    items,
    totalPrice,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    refetchServerCart: isAuth ? refetchServerCart : undefined,
    currentCartQuantity,
    maxAvailableQuantity,
    addItemLoading: isAuth ? addItemLoadingServer : false,
    updateItemLoading: isAuth ? updateItemLoadingServer : false,
    removeItemLoading: isAuth ? removeItemLoadingServer : false,
    clearCartLoading: isAuth ? clearCartLoadingServer : false,
  };
}
