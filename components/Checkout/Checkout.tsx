"use client";

import CartSection from "@/components/Checkout/CartSection";
import { taxCalculate } from "@/lib/taxCalculate";
import { useCartStore } from "@/store/cartState";
import { useEffect, useState, useTransition } from "react";
import PersonalInfo from "./PersonalInfo";
import TotalSection from "./TotalSection";
import AdressSection from "./AdressSection";
import { FormProvider, useForm } from "react-hook-form";
import { checkoutSchema, ChekoutSchema } from "./chekoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckboxCartSkeleton from "./CheckboxCartSkeleton";
import { createOrder } from "@/app/actions/createOrder";

const Checkout = () => {
  const [submitting, setSubmitting] = useState(false);
  const [pending, setTransition] = useTransition();
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loadingCart);
  const totalPriceFn = useCartStore((state) => state.total);
  const totalPrice = totalPriceFn();
  const itemsPriceWithTax = totalPrice! + taxCalculate(totalPrice!);
  useEffect(() => {
    fetchCartItems();
  }, []);

  const form = useForm<ChekoutSchema>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: ChekoutSchema) => {
    // try {
    //   setSubmitting(true);
    setTransition(async () => {
      const url = await createOrder(data);
      console.log(url);
      if (url) location.href = url.url!;
    });

    //   const res = await fetch("/api/payment", {
    //     method: "POST",
    //   });
    //   const data = await res.json();

    //   console.log("Ответ от сервера:", data);
    //   window.location.href = data.url;
    //   // });
    // } catch (err) {
    //   console.log(err);
    //   setSubmitting(false);
    // }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-20">
        <div
          className={`flex flex-1 flex-col gap-10 ${pending && "pointer-events-none"}`}
        >
          <CartSection loading={loading} items={items} />
          <PersonalInfo />
          <AdressSection />
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
