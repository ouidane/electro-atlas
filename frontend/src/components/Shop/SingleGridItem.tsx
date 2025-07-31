"use client";
import React from "react";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import Link from "next/link";
import Image from "next/image";
import { ImageOff, Heart } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";

const SingleGridItem = ({ item, index }: { item: Product; index: number }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();
  const {
    addItem: addToCart,
    isLoading: cartLoading,
    maxAvailableQuantity,
  } = useCart();
  const {
    isLoading: wishlistLoading,
    isInWishlist,
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
  } = useWishlist();

  const handleQuickView = () => {
    dispatch(updateQuickView(item));
    openModal();
  };

  const handleAddToCart = () => {
    if (maxAvailableQuantity(item) <= 0) return;
    addToCart(item, 1);
  };

  const handleItemToWishList = () => {
    if (isInWishlist(item._id)) {
      removeFromWishlist(item._id);
    } else {
      addToWishlist({
        productId: item._id,
        productName: item.name,
        image: item.image.medium,
        variant: item.variant,
      });
    }
  };

  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-white shadow-1 min-h-[270px] mb-4">
        {item.variant?.discountPercent > 0 && (
          <span className="absolute top-2 left-2 z-10 bg-red text-white text-xs font-bold px-2 py-1 rounded">
            -{item.variant.discountPercent}%
          </span>
        )}
        {item.variant.inventory <= 0 ? (
          <span className="absolute top-2 right-2 z-10 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
            Out of stock
          </span>
        ) : (
          item.variant.inventory <= 5 && (
            <span className="absolute top-2 right-2 z-10 bg-orange text-white text-xs font-bold px-2 py-1 rounded">
              Only {item.variant.inventory} left
            </span>
          )
        )}
        {item.image?.medium ? (
          <Link
            href={`/products/${item._id}`}
            className="w-full h-full block"
            tabIndex={0}
            aria-label={`View details for ${item.name}`}
          >
            <Image
              src={item.image.medium}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-6"
              priority={index < 6}
              loading={index < 6 ? "eager" : "lazy"}
            />
          </Link>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageOff className="w-6 h-6 text-meta-4" />
          </div>
        )}

        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
          <Button
            onClick={handleQuickView}
            id="newOne"
            aria-label="button for quick view"
            variant="outline"
            size="icon"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 text-dark bg-white hover:text-blue"
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
          </Button>

          <Button
            onClick={handleAddToCart}
            disabled={cartLoading || maxAvailableQuantity(item) <= 0}
            className={`inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] text-white ${
              maxAvailableQuantity(item) > 0
                ? "bg-blue hover:bg-blue-dark"
                : "bg-gray-4 cursor-not-allowed"
            } ${cartLoading ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {cartLoading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5 text-white" />
                Adding...
              </>
            ) : (
              "Add to cart"
            )}
          </Button>

          <Button
            onClick={handleItemToWishList}
            aria-label="button for favorite select"
            id="favOne"
            disabled={wishlistLoading}
            variant="outline"
            size="icon"
            className={`flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 text-dark bg-white hover:text-blue relative ${
              isInWishlist(item._id) ? "text-red" : ""
            }`}
          >
            {wishlistLoading ? (
              <Loader2 className="animate-spin h-5 w-5 text-red" />
            ) : (
              <Heart
                className="h-5 w-5"
                color={isInWishlist(item._id) ? "#ef4444" : "currentColor"}
                fill={isInWishlist(item._id) ? "#ef4444" : "none"}
              />
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2.5 mb-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={
                i < item.reviews.roundAvgRate ? "fill-yellow" : "fill-gray-4"
              }
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_375_9172)">
                <path
                  d="M16.7906 6.72187L11.7 5.93438L9.39377 1.09688C9.22502 0.759375 8.77502 0.759375 8.60627 1.09688L6.30002 5.9625L1.23752 6.72187C0.871891 6.77812 0.731266 7.25625 1.01252 7.50938L4.69689 11.3063L3.82502 16.6219C3.76877 16.9875 4.13439 17.2969 4.47189 17.0719L9.05627 14.5687L13.6125 17.0719C13.9219 17.2406 14.3156 16.9594 14.2313 16.6219L13.3594 11.3063L17.0438 7.50938C17.2688 7.25625 17.1563 6.77812 16.7906 6.72187Z"
                  fill=""
                />
              </g>
              <defs>
                <clipPath id="clip0_375_9172">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          ))}
        </div>
        <p className="text-custom-sm">({item.reviews.avgRate.toFixed(1)})</p>
      </div>

      <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
        <Link
          href={`/products/${item._id}`}
          className="block focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
          tabIndex={0}
          title={item.name}
        >
          <h4 className="line-clamp-2 break-words leading-5 sm:leading-6 hover:text-blue">
            {item.name}
          </h4>
        </Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark">${item.variant?.salePriceDecimal}</span>
        {item.variant?.discountPercent > 0 && (
          <span className="text-dark-4 line-through ml-1">
            ${item.variant?.globalPriceDecimal}
          </span>
        )}
      </span>
    </div>
  );
};

export default SingleGridItem;
