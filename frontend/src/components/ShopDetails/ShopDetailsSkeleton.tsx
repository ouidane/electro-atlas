import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ShopDetailsSkeleton: React.FC = () => {
  return (
    <>
      {/* Breadcrumb Skeleton */}
      <div className="overflow-hidden shadow-breadcrumb pt-[209px] sm:pt-[155px] lg:pt-[95px] xl:pt-[165px] border-t border-gray-3">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 py-2 xl:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <Skeleton className="h-8 w-48 mb-2" />
            <ul className="flex items-center gap-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-24 rounded-full" />
            </ul>
          </div>
        </div>
      </div>
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 animate-pulse">
          <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">
            {/* Image Skeleton */}
            <div className="lg:max-w-[570px] w-full">
              <div className="lg:min-h-[512px] rounded-lg shadow-1 p-4 sm:p-7.5 relative flex items-center justify-center bg-gray-100">
                <div className="absolute top-4 lg:top-6 right-4 lg:right-6 z-50">
                  <Skeleton className="w-11 h-11 rounded-[5px]" />
                </div>
                <Skeleton className="w-80 h-80 rounded-lg" />
              </div>
              <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
                <Skeleton className="w-15 sm:w-25 h-15 sm:h-25 rounded-lg" />
              </div>
            </div>
            {/* Details Skeleton */}
            <div className="max-w-[539px] w-full">
              <div className="mb-3">
                <Skeleton className="h-8 w-3/4 mb-2" />
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-5 mb-6">
                {/* Rating stars skeleton */}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <Skeleton className="h-5 w-24 ml-2" />
                </div>
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-7 w-32 mb-4.5" />
              {/* Brand/Model skeleton */}
              <Skeleton className="mb-2 h-4 w-1/2" />
              {/* Features skeleton */}
              <div className="mb-6 p-4 rounded-lg bg-gray-100">
                <Skeleton className="h-5 w-24 mb-2" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
              {/* Delivery info skeleton */}
              <ul className="flex flex-col gap-2 mb-7.5">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
              </ul>
              <div className="flex flex-col gap-4.5 border-b border-gray-3 mt-7.5 mb-9">
                <Skeleton className="h-8 w-1/2" />
              </div>
              {/* Quantity, Add to Cart, Wishlist skeletons */}
              <div className="flex flex-wrap items-center gap-4.5">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-12" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Product Info Section Skeleton */}
      <section className="overflow-hidden bg-white animate-pulse">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
          <Skeleton className="h-7 w-48 mb-6" />
          {/* Description skeleton */}
          <div className="mb-8">
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mb-2" />
            <Skeleton className="h-4 w-2/3 mb-2" />
          </div>
          {/* What's in the Box skeleton */}
          <div className="mb-8">
            <Skeleton className="h-6 w-40 mb-2" />
            <div className="space-y-1 pl-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
          {/* Specifications skeleton */}
          <div className="mb-2 overflow-x-auto">
            <Skeleton className="h-6 w-44 mb-2" />
            <div className="min-w-full">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`flex ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-2"
                  } rounded-lg`}
                >
                  <Skeleton className="pr-4 py-2 w-1/3 h-4" />
                  <Skeleton className="py-2 w-1/2 h-4 ml-2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopDetailsSkeleton;
