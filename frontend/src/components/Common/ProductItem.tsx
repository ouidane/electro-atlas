"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { useAddItemToCartMutation, useGetCartQuery, selectCartItems, addItemToCart as addItemToCartRedux } from "@/redux/features/cart-slice";
import { updateQuickView } from "@/redux/features/quickView-slice";
import {
  useGetWishlistQuery,
  useAddItemToWishlistMutation,
  useRemoveItemFromWishlistMutation,
  addItemToWishlist as addItemToWishlistRedux,
  removeItemFromWishlist as removeItemFromWishlistRedux,
} from "@/redux/features/wishlist-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { ImageOff } from "lucide-react";

const ProductItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
  const [addItemToCart, { isLoading: isAdding }] = useAddItemToCartMutation();
  const dispatch = useDispatch<AppDispatch>();
  const reduxCartItems = useSelector(selectCartItems);
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const { data: apiCart } = useGetCartQuery(undefined, { skip: !token });
  const { data: wishlistData } = useGetWishlistQuery(undefined, { skip: !token });
  const [addItemToWishlist, { isLoading: isAddingToWishlist }] = useAddItemToWishlistMutation();
  const [removeItemFromWishlist, { isLoading: isRemovingFromWishlist }] = useRemoveItemFromWishlistMutation();
  const wishlistItemsRedux = useSelector((state: RootState) => state.wishlistReducer.items);
  const isInReduxWishlist = wishlistItemsRedux.some((wishlistItem) => wishlistItem.productId === item._id);
  const isInWishlist = wishlistData?.data?.items?.some((wishlistItem) => wishlistItem.productId === item._id);

  // Choose the correct cart source
  let cartItems = reduxCartItems;
  if (token && apiCart && apiCart.data && apiCart.data.cartItems) {
    cartItems = apiCart.data.cartItems;
  }

  // Get current quantity in cart for this product
  const currentCartQuantity = cartItems.find(cartItem => cartItem.product?._id === item._id)?.quantity || 0;
  // Calculate maximum available quantity (inventory minus what's already in cart)
  const maxAvailableQuantity = item.variant.inventory - currentCartQuantity;

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  // add to cart
  const handleAddToCart = async () => {
    if (maxAvailableQuantity <= 0) return;
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
    if (token) {
      await addItemToCart({ productId: item._id, quantity: 1 });
    } else {
      dispatch(
        addItemToCartRedux({
          product: { ...item, image: item.image.medium },
          quantity: 1,
        })
      );
    }
  };

  const handleItemToWishList = async () => {
    if (!token) {
      if (isInReduxWishlist) {
        dispatch(removeItemFromWishlistRedux(item._id));
      } else {
        dispatch(
          addItemToWishlistRedux({
            _Id: item._id,
            productId: item._id,
            productName: item.name,
            image: item.image.medium,
            variant: item.variant,
          })
        );
      }
      return;
    }
    if (isInWishlist) {
      await removeItemFromWishlist({ productId: item._id });
    } else {
      await addItemToWishlist({ productId: item._id });
    }
  };

  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...item }));
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg min-h-[270px] mb-4">
        {item.image?.large ? (
          <Link href={`/products/${item._id}`} title={item.name}>
            <Image
              src={item.image.large}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-2"
            />
          </Link>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff className="w-6 h-6 text-muted-foreground" />
          </div>
        )}

        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <button
            onClick={() => {
              openModal();
              handleQuickViewUpdate();
            }}
            id="newOne"
            aria-label="button for quick view"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
          >
            <svg
              className="fill-current"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.00016 5.5C6.61945 5.5 5.50016 6.61929 5.50016 8C5.50016 9.38071 6.61945 10.5 8.00016 10.5C9.38087 10.5 10.5002 9.38071 10.5002 8C10.5002 6.61929 9.38087 5.5 8.00016 5.5ZM6.50016 8C6.50016 7.17157 7.17174 6.5 8.00016 6.5C8.82859 6.5 9.50016 7.17157 9.50016 8C9.50016 8.82842 8.82859 9.5 8.00016 9.5C7.17174 9.5 6.50016 8.82842 6.50016 8Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.00016 2.16666C4.99074 2.16666 2.96369 3.96946 1.78721 5.49791L1.76599 5.52546C1.49992 5.87102 1.25487 6.18928 1.08862 6.5656C0.910592 6.96858 0.833496 7.40779 0.833496 8C0.833496 8.5922 0.910592 9.03142 1.08862 9.4344C1.25487 9.81072 1.49992 10.129 1.76599 10.4745L1.78721 10.5021C2.96369 12.0305 4.99074 13.8333 8.00016 13.8333C11.0096 13.8333 13.0366 12.0305 14.2131 10.5021L14.2343 10.4745C14.5004 10.129 14.7455 9.81072 14.9117 9.4344C15.0897 9.03142 15.1668 8.5922 15.1668 8C15.1668 7.40779 15.0897 6.96858 14.9117 6.5656C14.7455 6.18927 14.5004 5.87101 14.2343 5.52545L14.2131 5.49791C13.0366 3.96946 11.0096 2.16666 8.00016 2.16666ZM2.57964 6.10786C3.66592 4.69661 5.43374 3.16666 8.00016 3.16666C10.5666 3.16666 12.3344 4.69661 13.4207 6.10786C13.7131 6.48772 13.8843 6.7147 13.997 6.9697C14.1023 7.20801 14.1668 7.49929 14.1668 8C14.1668 8.50071 14.1023 8.79199 13.997 9.0303C13.8843 9.28529 13.7131 9.51227 13.4207 9.89213C12.3344 11.3034 10.5666 12.8333 8.00016 12.8333C5.43374 12.8333 3.66592 11.3034 2.57964 9.89213C2.28725 9.51227 2.11599 9.28529 2.00334 9.0303C1.89805 8.79199 1.8335 8.50071 1.8335 8C1.8335 7.49929 1.89805 7.20801 2.00334 6.9697C2.11599 6.7147 2.28725 6.48772 2.57964 6.10786Z"
                fill=""
              />
            </svg>
          </button>

          <button
            onClick={() => handleAddToCart()}
            disabled={isAdding || maxAvailableQuantity <= 0}
            className={`inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] text-white ease-out duration-200 ${
              maxAvailableQuantity > 0 ? 'bg-blue hover:bg-blue-dark' : 'bg-gray-4 cursor-not-allowed'
            } ${isAdding ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {isAdding ? (
              <>
                <svg className="animate-spin mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
                Adding...
              </>
            ) : (
              'Add to cart'
            )}
          </button>

          <button
            onClick={handleItemToWishList}
            aria-label="button for favorite select"
            id="favOne"
            disabled={isAddingToWishlist || isRemovingFromWishlist}
            className={`flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue relative ${
              (isInWishlist || isInReduxWishlist) ? "text-red" : ""
            }`}
          >
            {(isAddingToWishlist || isRemovingFromWishlist) ? (
              <svg className="animate-spin h-5 w-5 text-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill={(isInWishlist || isInReduxWishlist) ? "#ef4444" : "none"}
                stroke={(isInWishlist || isInReduxWishlist) ? "#ef4444" : "currentColor"}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2.5 mb-2">
        <div className="flex items-center gap-1">
          <Image
            src="/images/icons/icon-star.svg"
            alt="star icon"
            width={14}
            height={14}
          />
          <Image
            src="/images/icons/icon-star.svg"
            alt="star icon"
            width={14}
            height={14}
          />
          <Image
            src="/images/icons/icon-star.svg"
            alt="star icon"
            width={14}
            height={14}
          />
          <Image
            src="/images/icons/icon-star.svg"
            alt="star icon"
            width={14}
            height={14}
          />
          <Image
            src="/images/icons/icon-star.svg"
            alt="star icon"
            width={14}
            height={14}
          />
        </div>

        <p className="text-custom-sm">({item.reviews.roundAvgRate})</p>
      </div>

      <h3
        className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5"
        onClick={() => handleProductDetails()}
      >
        <Link href={`/products/${item._id}`} className="line-clamp-2 break-words">
          {item.name}
        </Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark">${item.variant?.salePriceDecimal}</span>
        <span className="text-dark-4 line-through">
          ${item.variant?.globalPriceDecimal}
        </span>
      </span>
    </div>
  );
};

export default ProductItem;
