import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIsLoggedIn } from "./useIsLoggedIn";
import {
  useGetWishlistQuery,
  useAddItemToWishlistMutation,
  useRemoveItemFromWishlistMutation,
  useClearWishlistMutation,
} from "@/redux/features/wishlist/wishlist-api";
import {
  addItemToWishlist as addGuestItem,
  removeItemFromWishlist as removeGuestItem,
  removeAllItemsFromWishlist as clearGuestWishlist,
  selectWishlistItems,
  selectWishlistCount,
} from "@/redux/features/wishlist/wishlist-slice";
import type { WishlistItem } from "@/types";

export function useWishlist() {
  const { isLoggedIn: isAuth, loading: isAuthLoading } = useIsLoggedIn();
  const dispatch = useDispatch();

  // Server-side wishlist
  const {
    data: serverResponse,
    isLoading: wishlistLoading,
    refetch: refetchServerWishlist,
  } = useGetWishlistQuery(undefined, { skip: !isAuth });
  const [addServerItem, { isLoading: addItemLoadingServer }] =
    useAddItemToWishlistMutation();
  const [removeServerItem, { isLoading: removeItemLoadingServer }] =
    useRemoveItemFromWishlistMutation();
  const [clearServer, { isLoading: clearWishlistLoadingServer }] =
    useClearWishlistMutation();

  // Guest-side wishlist
  // (Remove guest loading state logic)
  const guestItems = useSelector(selectWishlistItems);
  const guestCount = useSelector(selectWishlistCount);

  // On auth, seed guest slice with server data once
  const items = isAuth ? serverResponse?.data.items ?? [] : guestItems;
  const count = isAuth ? serverResponse?.data.itemsCount ?? 0 : guestCount;

  // Wishlist logic helper
  function isInWishlist(productId: string): boolean {
    return items.some((i) => i.productId === productId);
  }

  const addItem = useCallback(
    (item: Omit<WishlistItem, "_id">) => {
      if (isAuth) {
        addServerItem({ productId: item.productId, itemData: item });
      } else {
        // assign a temp _id
        const tempItem: WishlistItem = {
          _id: `${item.productId}_temp`,
          ...item,
        };
        dispatch(addGuestItem(tempItem));
      }
    },
    [isAuth, addServerItem, dispatch]
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

  const clearWishlist = useCallback(() => {
    if (isAuth) {
      clearServer();
    } else {
      dispatch(clearGuestWishlist());
    }
  }, [isAuth, clearServer, dispatch]);

  return {
    isLoading:
      wishlistLoading ||
      addItemLoadingServer ||
      removeItemLoadingServer ||
      clearWishlistLoadingServer,
    isAuthenticated: Boolean(isAuth),
    items,
    count,
    addItem,
    removeItem,
    clearWishlist,
    refetchServerWishlist: isAuth ? refetchServerWishlist : undefined,
    isInWishlist,
    addItemLoading: isAuth ? addItemLoadingServer : false,
    removeItemLoading: isAuth ? removeItemLoadingServer : false,
    clearWishlistLoading: isAuth ? clearWishlistLoadingServer : false,
  };
}
