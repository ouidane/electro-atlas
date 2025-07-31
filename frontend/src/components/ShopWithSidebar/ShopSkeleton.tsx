"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SingleItemSkeleton from "@/components/Shop/SingleItemSkeleton";

const ShopSkeleton = () => {
  // Number of skeleton items to display
  const placeholderItems = Array.from({ length: 6 });

  return (
    <>
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
      <section className="overflow-hidden relative pb-20 pt-5 lg:pt-12 bg-[#f3f4f6]">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex gap-7.5">
            {/* Sidebar Skeleton */}
            <div className="max-w-[270px] w-full hidden xl:block">
              <div className="space-y-4">
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
                <Skeleton className="h-12 w-full rounded-lg" />
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="xl:max-w-[870px] w-full space-y-6">
              {/* Top Bar Skeleton */}
              <div className="rounded-lg bg-white shadow-1 p-4 flex items-center justify-between">
                <Skeleton className="h-8 w-32" />
                <div className="flex space-x-2">
                  <Skeleton className="h-9 w-9 rounded-md" />
                  <Skeleton className="h-9 w-9 rounded-md" />
                </div>
              </div>

              {/* Products Grid Skeleton */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
                {placeholderItems.map((_, idx) => (
                  <SingleItemSkeleton key={idx} />
                ))}
              </div>

              {/* Pagination Skeleton */}
              <div className="flex justify-center mt-8">
                <div className="bg-white shadow-1 rounded-md p-4 flex items-center space-x-2">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Skeleton key={idx} className="h-6 w-6 rounded-full" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopSkeleton;
