"use client";

import CartSection from "@/components/Checkout/CartSection";
import { cartItemsTotalPrice } from "@/lib/cartItemsTotalPrice";
import { taxCalculate } from "@/lib/taxCalculate";
import { useCartStore } from "@/store/cartState";
import { useEffect } from "react";
import PersonalInfo from "./PersonalInfo";
import TotalSection from "./TotalSection";

const Checkout = () => {
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loadingCart);
  const error = useCartStore((state) => state.error);

  const totalPriceFn = useCartStore((state) => state.total);
  const totalPrice = totalPriceFn();
  const itemsPriceWithTax = totalPrice! + taxCalculate(totalPrice!);
  useEffect(() => {
    fetchCartItems();
  }, []);
  return (
    <div>
      <div className="flex gap-20">
        <div className="flex flex-1 flex-col gap-10">
          <CartSection items={items} />
          <PersonalInfo />
        </div>
        <div>
          <TotalSection
            itemsPriceWithTax={itemsPriceWithTax}
            totalPrice={totalPrice}
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
