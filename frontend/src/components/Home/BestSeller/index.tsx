"use client";

import React from "react";
import SingleItem from "./SingleItem";
import SingleItemSkeleton from "./SingleItemSkeleton";
import Image from "next/image";
import Link from "next/link";
import { useGetBestSellerQuery } from "@/redux/features/discover/discover-api";

const BestSeller = () => {
  // Fetch best selling products
  const { data, isLoading } = useGetBestSellerQuery({ limit: 6 });
  const products = Array.isArray(data?.data) ? data.data : [];

  return (
    <section className="overflow-hidden">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <Image
                src="/images/icons/icon-07.svg"
                alt="icon"
                width={17}
                height={17}
              />
              This Month
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              Best Sellers
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
          {/* <!-- Best Sellers item --> */}
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <SingleItemSkeleton key={idx} />
              ))
            : products.map((item) => <SingleItem item={item} key={item._id} />)}
        </div>

        <div className="text-center mt-12.5">
          <Link
            href="/products?sort=bestSelling"
            className="inline-flex font-medium text-custom-sm py-3 px-7 sm:px-12.5 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
