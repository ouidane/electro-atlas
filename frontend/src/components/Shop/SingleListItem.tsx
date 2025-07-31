"use client";
import React from "react";

import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { ImageOff, Heart } from "lucide-react";
import { useDispatch } from "react-redux";

const SingleListItem = ({ item, index }: { item: Product; index: number }) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch();
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

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
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
    <div className="group rounded-lg bg-white shadow-1">
      <div className="flex">
        <div className="shadow-list relative overflow-hidden flex items-center justify-center max-w-[150px] w-full sm:min-h-[150px] p-2">
          {item.image?.medium ? (
            <Image
              src={item.image.medium}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-6"
              priority={index < 6}
              loading={index < 6 ? undefined : "lazy"}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageOff className="w-6 h-6 text-muted-foreground" />
            </div>
          )}
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
          {/* <Image src={item.image.large} alt="" width={250} height={250} /> */}

          <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-200 group-hover:translate-y-0">
            <Button
              onClick={() => {
                openModal();
                handleQuickViewUpdate();
              }}
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
              variant="outline"
              size="icon"
              className={`flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 text-dark bg-white hover:text-white hover:bg-blue ${
                maxAvailableQuantity(item) > 0
                  ? ""
                  : "bg-gray-4 cursor-not-allowed"
              } ${cartLoading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {cartLoading ? (
                <Loader2 className="animate-spin h-5 w-5 text-white" />
              ) : (
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
                    d="M1.4915 1.52567C1.22953 1.43835 0.94637 1.57993 0.859046 1.8419C0.771722 2.10387 0.913302 2.38703 1.17527 2.47436L1.35188 2.53322C1.80282 2.68354 2.10095 2.78371 2.32058 2.88589C2.52856 2.98264 2.61848 3.0605 2.67609 3.14043C2.7337 3.22037 2.77914 3.33029 2.80516 3.55819C2.83263 3.79886 2.83339 4.11337 2.83339 4.5887L2.83339 6.36993C2.83337 7.28166 2.83336 8.01654 2.91107 8.59451C2.99175 9.19459 3.16434 9.69984 3.56562 10.1011C3.9669 10.5024 4.47215 10.675 5.07222 10.7557C5.6502 10.8334 6.38507 10.8334 7.29679 10.8333H12.6667C12.9429 10.8333 13.1667 10.6095 13.1667 10.3333C13.1667 10.0572 12.9429 9.83335 12.6667 9.83335H7.33339C6.37644 9.83335 5.70903 9.83228 5.20547 9.76458C4.71628 9.69881 4.45724 9.57852 4.27273 9.39401C4.20826 9.32954 4.15164 9.25598 4.10244 9.16668H10.7057C11.0046 9.1667 11.2675 9.16671 11.4858 9.14315C11.7221 9.11764 11.951 9.06096 12.1664 8.91894C12.3818 8.77692 12.524 8.58882 12.6406 8.3817C12.7482 8.19036 12.8518 7.94869 12.9695 7.67396L13.2807 6.94778C13.537 6.34978 13.7515 5.84948 13.8588 5.44258C13.9708 5.01809 13.9999 4.57488 13.7358 4.17428C13.4716 3.77367 13.0528 3.62588 12.6185 3.56159C12.2022 3.49996 11.6579 3.49999 11.0073 3.50001L3.80456 3.50001C3.80273 3.48135 3.80078 3.46293 3.7987 3.44476C3.7618 3.12155 3.6814 2.82497 3.48733 2.55572C3.29327 2.28647 3.03734 2.11641 2.74238 1.9792C2.46489 1.85011 2.11201 1.73249 1.69443 1.59331L1.4915 1.52567ZM3.83339 4.50001C3.83339 4.52018 3.83339 4.54048 3.83339 4.56094L3.83339 6.33335C3.83339 7.11467 3.8341 7.70297 3.87121 8.16668H10.6813C11.0119 8.16668 11.2202 8.16601 11.3785 8.14892C11.5246 8.13314 11.5808 8.10724 11.6159 8.0841C11.651 8.06097 11.6969 8.01951 11.769 7.89139C11.847 7.7527 11.9298 7.56142 12.06 7.25756L12.3457 6.59089C12.622 5.94609 12.8057 5.51422 12.8919 5.18751C12.9756 4.87003 12.9332 4.77367 12.9009 4.72477C12.8687 4.67586 12.7968 4.5989 12.472 4.55081C12.1378 4.50133 11.6685 4.50001 10.967 4.50001H3.83339Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.50005 13C3.50005 13.8284 4.17163 14.5 5.00005 14.5C5.82848 14.5 6.50005 13.8284 6.50005 13C6.50005 12.1716 5.82848 11.5 5.00005 11.5C4.17163 11.5 3.50005 12.1716 3.50005 13ZM5.00005 13.5C4.72391 13.5 4.50005 13.2762 4.50005 13C4.50005 12.7239 4.72391 12.5 5.00005 12.5C5.2762 12.5 5.50005 12.7239 5.50005 13C5.50005 13.2762 5.2762 13.5 5.00005 13.5Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.0001 14.5001C10.1716 14.5001 9.50005 13.8285 9.50005 13.0001C9.50005 12.1716 10.1716 11.5001 11.0001 11.5001C11.8285 11.5001 12.5001 12.1716 12.5001 13.0001C12.5001 13.8285 11.8285 14.5001 11.0001 14.5001ZM10.5001 13.0001C10.5001 13.2762 10.7239 13.5001 11.0001 13.5001C11.2762 13.5001 11.5001 13.2762 11.5001 13.0001C11.5001 12.7239 11.2762 12.5001 11.0001 12.5001C10.7239 12.5001 10.5001 12.7239 10.5001 13.0001Z"
                    fill=""
                  />
                </svg>
              )}
            </Button>

            <Button
              onClick={handleItemToWishList}
              aria-label="button for favorite select"
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

        <div className="w-full flex flex-col gap-5 sm:flex-row sm:items-center justify-center sm:justify-between py-5 px-4 sm:px-7.5 lg:pl-11 lg:pr-12">
          <div>
            <h3 className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5">
              <Link
                href="/shop-details"
                className="line-clamp-2 break-words leading-5 sm:leading-6 hover:text-blue-600"
              >
                {" "}
                {item.name}{" "}
              </Link>
            </h3>

            <span className="flex items-center gap-2 font-medium text-lg">
              <span className="text-dark">
                ${item.variant?.salePriceDecimal}
              </span>
              <span className="text-dark-4 line-through">
                ${item.variant?.globalPriceDecimal}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-2.5 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={
                    i < item.reviews.roundAvgRate
                      ? "fill-yellow"
                      : "fill-gray-4"
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
            <p className="text-custom-sm">
              ({item.reviews.avgRate.toFixed(1)})
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleListItem;
