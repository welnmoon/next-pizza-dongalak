"use client";

import { Skeleton } from "@/components/ui/skeleton";

const CartSectionItemSkeleton = () => {
  return (
    <div className="w-full bg-white">
      <div className="flex gap-2 items-center justify-between p-4">
        {/* Левая часть: картинка и описание */}
        <div className="flex gap-2 w-1/2">
          <Skeleton className="w-20 h-20 rounded-full" />
          <div className="flex flex-col flex-1 gap-2">
            <Skeleton className="h-4 w-30" />
            <Skeleton className="h-3 w-50" />
          </div>
        </div>
      </div>

      {/* Разделитель */}
      <div className="flex-1 border-b border-gray-100" />
    </div>
  );
};

export default CartSectionItemSkeleton;
