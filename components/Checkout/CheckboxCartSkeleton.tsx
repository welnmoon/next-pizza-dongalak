"use client";

import { Skeleton } from "@/components/ui/skeleton";

const CartSectionItemSkeleton = () => {
  return (
    <div className="w-full bg-[#FFFCF7]">
      <div className="flex flex-col gap-4 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
        {/* Левая часть: картинка и описание */}
        <div className="flex gap-3 sm:w-1/2">
          <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-full" />
          <div className="flex flex-col flex-1 gap-2">
            <Skeleton className="h-4 w-30" />
            <Skeleton className="h-3 w-50" />
          </div>
        </div>
      </div>

      {/* Разделитель */}
      <div className="flex-1 border-b border-stone-200" />
    </div>
  );
};

export default CartSectionItemSkeleton;
