"use client";

import CartSection from "@/components/Checkout/CartSection";
import { taxCalculate } from "@/lib/taxCalculate";
import { useCartStore } from "@/store/cartState";
import { useEffect, useState, useTransition } from "react";
import PersonalInfo from "./PersonalInfo";
import TotalSection from "./TotalSection";
import { FormProvider, useForm } from "react-hook-form";
import { checkoutSchema, ChekoutSchema } from "./chekoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrder } from "@/app/actions/createOrder";
import AddressSection from "./AdressSection";

const Checkout = () => {
  const [pending, setTransition] = useTransition();
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loadingCart);
  const totalPriceFn = useCartStore((state) => state.total);
  const totalPrice = totalPriceFn();
  const itemsPriceWithTax = totalPrice! + taxCalculate(totalPrice!);
  
  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const form = useForm<ChekoutSchema>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ChekoutSchema) => {
    setTransition(async () => {
      const url = await createOrder(data);
      console.log(url);
      if (url) location.href = url;
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-20">
        <div
          className={`flex flex-1 flex-col gap-10 ${pending && "pointer-events-none"}`}
        >
          <CartSection loading={loading} items={items} />
          <PersonalInfo />
          <AddressSection />
        </div>
        <div>
          <TotalSection
            itemsPriceWithTax={itemsPriceWithTax}
            totalPrice={totalPrice}
            pending={pending}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default Checkout;
