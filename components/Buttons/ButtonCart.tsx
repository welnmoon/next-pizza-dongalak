"use client";

import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { CartDrawer } from "../Cart/CartDrawer";
import { useCartStore } from "@/store/cartState";
import { cartItemsTotalPrice } from "@/lib/cartItemsTotalPrice";

const ButtonCart = () => {
  const cartItems = useCartStore((s) => s.items);
  const totalPrice = cartItemsTotalPrice({ items: cartItems });

  return (
    <div className="relative">
      <CartDrawer>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-4 py-2 flex items-center gap-2 shadow-md group min-w-[120px] justify-between cursor-pointer">
          {/* Сумма */}
          <span className="text-md font-semibold">{totalPrice} ₸</span>

          {/* Разделительная линия */}
          <div className="w-px h-5 bg-white opacity-60" />

          {/* Иконка корзины и число */}
          <div className="relative flex items-center w-[30px] h-5 justify-end">
            {/* ShoppingCart (по умолчанию) */}
            <ShoppingCart className="w-5 h-5 absolute left-0 top-0 " />

            {/* ArrowRight (появляется при наведении) */}
            <ArrowRight className="w-5 h-5 absolute left-4 top-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100" />

            {/* Число товаров (всегда видно, справа) */}
            <span className="ml-6 text-md font-semibold transition-opacity duration-200 opacity-100 group-hover:opacity-0">
              {cartItems.length}
            </span>
          </div>
        </Button>
      </CartDrawer>
    </div>
  );
};

export default ButtonCart;
