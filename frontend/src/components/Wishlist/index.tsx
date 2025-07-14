"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import {
  useGetWishlistQuery,
  useClearWishlistMutation,
} from "@/redux/features/wishlist-slice";
import { useDispatch } from "react-redux";
import { removeAllItemsFromWishlist } from "@/redux/features/wishlist-slice";
import { AppDispatch } from "@/redux/store";

export const Wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wishlistItemsRedux = useAppSelector((state) => state.wishlistReducer.items);
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const { data: wishlistData, isLoading } = useGetWishlistQuery(undefined, { skip: !token });
  const [clearWishlist, { isLoading: isClearing }] = useClearWishlistMutation();

  const wishlistItems = token ? wishlistData?.data?.items || [] : wishlistItemsRedux;

  const handleClearWishlist = async () => {
    if (token) {
      await clearWishlist({});
    } else {
      dispatch(removeAllItemsFromWishlist());
    }
  };

  return (
    <>
      <Breadcrumb title={"Wishlist"} pages={["Wishlist"]} />
      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
            <h2 className="font-medium text-dark text-2xl">Your Wishlist</h2>
            <button className="text-blue flex items-center" onClick={handleClearWishlist} disabled={isClearing}>
              {isClearing && (
                <svg className="animate-spin h-5 w-5 mr-2 text-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                </svg>
              )}
              Clear Wishlist
            </button>
          </div>

          <div className="bg-white rounded-[10px] shadow-1">
            <div className="w-full overflow-x-auto">
              <div className="min-w-[1170px]">
                {/* <!-- table header --> */}
                <div className="flex items-center py-5.5 px-10">
                  <div className="min-w-[83px]"></div>
                  <div className="min-w-[387px]">
                    <p className="text-dark">Product</p>
                  </div>

                  <div className="min-w-[205px]">
                    <p className="text-dark">Unit Price</p>
                  </div>

                  <div className="min-w-[265px]">
                    <p className="text-dark">Stock Status</p>
                  </div>

                  <div className="min-w-[150px]">
                    <p className="text-dark text-right">Action</p>
                  </div>
                </div>

                {/* <!-- wish item --> */}
                {isLoading ? (
                  <div className="flex items-center justify-center py-10">
                    <svg className="animate-spin h-6 w-6 text-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  </div>
                ) : (
                  wishlistItems.map((item) => (
                    <SingleItem item={item} key={item.productId} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
