"use client";

import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";

const ButtonCart = () => {
  return (
    <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 flex items-center gap-4 shadow-md group">
      {/* Сумма */}
      <span className="text-md font-semibold">3980 ₸</span>

      {/* Разделительная линия */}
      <div className="w-px h-5 bg-white opacity-60" />

      {/* Корзина + число */}
      <div className="flex items-center gap-1 relative min-w-[40px] justify-end">
        {/* Иконки в одном месте, переключаются через opacity */}
        <div className="relative w-5 h-5">
          <ShoppingCart className="absolute w-5 h-5 transition-opacity duration-200 group-hover:opacity-0" />
          <ArrowRight className="absolute w-5 h-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        </div>

        {/* Число товаров */}
        <span className="text-md font-semibold">3</span>
      </div>
    </Button>
  );
};

export default ButtonCart;
