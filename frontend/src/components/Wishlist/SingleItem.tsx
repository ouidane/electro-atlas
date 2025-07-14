import React from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  useRemoveItemFromWishlistMutation,
  removeItemFromWishlist as removeItemFromWishlistRedux 
} from "@/redux/features/wishlist-slice";
import {
  addItemToCart as addItemToCartRedux,
  selectCartItems,
  useAddItemToCartMutation,
  useGetCartQuery
} from "@/redux/features/cart-slice";
import Link from "next/link";
import Image from "next/image";
import { ImageOff } from "lucide-react";

const SingleItem = ({ item }: { item: {
  _Id: string;
  productId: string;
  productName: string;
  image: string;
  variant: any;
} }) => {
  const dispatch = useDispatch<AppDispatch>();
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const [removeItemFromWishlist, { isLoading: isRemoving }] = useRemoveItemFromWishlistMutation();
  
  const reduxCartItems = useSelector(selectCartItems);
  const { data: apiCart } = useGetCartQuery(undefined, { skip: !token });

  const handleRemoveFromWishlist = async () => {
    if (token) {
      await removeItemFromWishlist({ productId: item.productId });
    } else {
      dispatch(removeItemFromWishlistRedux(item.productId));
    }
  };

  // Choose the correct cart source
  let cartItems = reduxCartItems;
  if (token && apiCart && apiCart.data && apiCart.data.cartItems) {
    cartItems = apiCart.data.cartItems;
  }

  // Get current quantity in cart for this product
  const currentCartQuantity = cartItems.find(cartItem => cartItem.product?._id === item.productId)?.quantity || 0;
  
  // Calculate maximum available quantity (inventory minus what's already in cart)
  const maxAvailableQuantity = item.variant.inventory - currentCartQuantity;

  const [addItemToCart, { isLoading: isAdding }] = useAddItemToCartMutation();
  const handleAddToCart = async () => {
    // Don't add if no inventory available
    if (maxAvailableQuantity <= 0) return;;
    
    if (token) {
      await addItemToCart({ productId: item.productId, quantity: 1 });
    } else {
      dispatch(
        addItemToCartRedux({
          product: {
            _id: item.productId,
            name: item.productName,
            image: item.image,
            variant: item.variant,
          },
          quantity: 1,
        })
      );
    }
  };

  return (
    <div className="flex items-center border-t border-gray-3 py-5 px-10">
      <div className="min-w-[83px]">
        <button
          onClick={handleRemoveFromWishlist}
          aria-label="button for remove product from wishlist"
          className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
          disabled={isRemoving}
        >
          {isRemoving ? (
            <svg className="animate-spin h-5 w-5 text-red" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
          ) : (
            <svg
              className="fill-current"
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.19509 8.22222C8.92661 7.95374 8.49131 7.95374 8.22282 8.22222C7.95433 8.49071 7.95433 8.92601 8.22282 9.1945L10.0284 11L8.22284 12.8056C7.95435 13.074 7.95435 13.5093 8.22284 13.7778C8.49133 14.0463 8.92663 14.0463 9.19511 13.7778L11.0006 11.9723L12.8061 13.7778C13.0746 14.0463 13.5099 14.0463 13.7784 13.7778C14.0469 13.5093 14.0469 13.074 13.7784 12.8055L11.9729 11L13.7784 9.19451C14.0469 8.92603 14.0469 8.49073 13.7784 8.22224C13.5099 7.95376 13.0746 7.95376 12.8062 8.22224L11.0006 10.0278L9.19509 8.22222Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M11.0007 1.14587C5.55835 1.14587 1.14648 5.55773 1.14648 11C1.14648 16.4423 5.55835 20.8542 11.0007 20.8542C16.443 20.8542 20.8548 16.4423 20.8548 11C20.8548 5.55773 16.443 1.14587 11.0007 1.14587ZM2.52148 11C2.52148 6.31713 6.31774 2.52087 11.0007 2.52087C15.6836 2.52087 19.4798 6.31713 19.4798 11C19.4798 15.683 15.6836 19.4792 11.0007 19.4792C6.31774 19.4792 2.52148 15.683 2.52148 11Z"
                fill=""
              />
            </svg>
          )}
        </button>
      </div>

      <div className="min-w-[387px]">
        <div className="flex items-center justify-between gap-5">
          <div className="w-full flex items-center gap-5.5">
            <div className="flex items-center justify-center rounded-[5px] bg-white max-w-[80px] w-full h-17.5">
              {item.image ? (
                <Image src={item.image} alt={item.productName} width={40} height={40} />
              ) : (
                <ImageOff className="w-6 h-6 text-meta-4" />
              )}
            </div>

            <div>
              <h3 className="line-clamp-2 break-words leading-5 sm:leading-6 hover:text-blue">
                <Link href={`/products/${item.productId}`}>{item.productName}</Link>
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="min-w-[205px]">
        <p className="text-dark">${item.variant?.salePriceDecimal}</p>
      </div>

      <div className="min-w-[265px]">
        <div className="flex items-center gap-1.5">
          {item.variant?.inventory > 0 ? (
            <span className="text-green">In Stock</span>
          ) : (
            <span className="text-red">Out of Stock</span>
          )}
        </div>
      </div>

      <div className="min-w-[150px] flex justify-end">
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
      </div>
    </div>
  );
};

export default SingleItem;
