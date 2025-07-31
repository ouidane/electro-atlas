import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SingleItemSkeleton: React.FC = () => {
  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-white shadow-1 min-h-[270px] mb-4">
        {/* Image */}
        <Skeleton className="w-full h-full object-contain" />
        {/* Action buttons */}
        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 group-hover:translate-y-0">
          <Skeleton className="w-9 h-9 rounded-[5px]" />
          <Skeleton className="w-24 h-9 rounded-[5px]" />
          <Skeleton className="w-9 h-9 rounded-[5px]" />
        </div>
      </div>
      {/* Rating */}
      <div className="flex items-center gap-2.5 mb-2">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="w-5 h-5 rounded" />
          ))}
        </div>
        <Skeleton className="w-10 h-5 rounded" />
      </div>
      {/* Title */}
      <Skeleton className="h-6 w-3/4 mb-2 rounded" />
      {/* Price */}
      <div className="flex items-center gap-2 font-medium text-lg">
        <Skeleton className="h-6 w-16 rounded" />
        <Skeleton className="h-6 w-12 rounded" />
      </div>
    </div>
  );
};

export default SingleItemSkeleton;
