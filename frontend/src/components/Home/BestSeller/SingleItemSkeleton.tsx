import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SingleItemSkeleton = () => (
  <div className="group animate-pulse">
    <div className="relative overflow-hidden rounded-lg min-h-[403px] bg-gray-100">
      <div className="text-center px-4 py-7.5">
        <div className="flex items-center justify-center gap-2.5 mb-2">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="w-4 h-4 rounded" />
            ))}
          </div>
          <Skeleton className="h-4 w-10 rounded" />
        </div>
        <Skeleton className="h-6 w-3/4 mb-1.5 mx-auto" />
        <div className="flex items-center justify-center gap-2 font-medium text-lg">
          <Skeleton className="h-5 w-16 rounded" />
          <Skeleton className="h-4 w-12 rounded" />
        </div>
      </div>
      <div className="flex justify-center items-center">
        <Skeleton className="w-[200px] h-[200px] rounded object-contain max-h-40" />
      </div>
      <div className="absolute right-0 bottom-0 translate-x-full u-w-full flex flex-col gap-2 p-5.5 ease-linear duration-300 group-hover:translate-x-0">
        <Skeleton className="w-9 h-9 rounded-[5px] shadow-1" />
        <Skeleton className="w-9 h-9 rounded-[5px] shadow-1" />
        <Skeleton className="w-9 h-9 rounded-[5px] shadow-1" />
      </div>
    </div>
  </div>
);

export default SingleItemSkeleton;
