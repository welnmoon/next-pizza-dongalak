import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ChevronRight } from "lucide-react";
import CartDrawerItem from "./CartDrawerItem";
import { useCartStore } from "@/store/cartState";
import { taxCalculate } from "@/lib/taxCalculate";
import { cartItemsTotalPrice } from "@/lib/cartItemsTotalPrice";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

export function CartDrawer({ children }: Props) {
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loadingCart);
  const error = useCartStore((state) => state.error);

  const totalPrice = cartItemsTotalPrice({ items });
  const itemsPriceWithTax = totalPrice! + taxCalculate(totalPrice!);
  useEffect(() => {
    fetchCartItems();
  }, []);

  if (loading)
    return (
      <div className="w-[130px] h-9 flex items-center justify-center bg-orange-500/60 rounded-full">
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="!max-w-none w-[430px] bg-gray-100 flex flex-col"
      >
        {items.length > 0 && (
          <SheetHeader>
            <SheetTitle>
              {items.length} товара на {totalPrice} тг.
            </SheetTitle>
          </SheetHeader>
        )}

        {/* 👉 Прокручиваемая часть */}
        {items.length > 0 ? (
          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
            <AnimatePresence>
              {items.map((i) => (
                <CartDrawerItem key={i.id} item={i} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="m-auto w-1/2 text-center">
            <div className="items-center">
              <Image
                alt="empty"
                width={150}
                height={150}
                src="/empty-cart.png"
                className="m-auto"
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex flex-col gap-1">
                <h2 className="font-bold text-xl">Корзина пуста</h2>
                <p className="text-sm text-gray-500">
                  Добавьте хотя бы одну пиццу, чтобы совершить заказ
                </p>
              </div>

              <SheetClose asChild>
                <Button className="bg-orange-500 hover:bg-orange-600 flex h-10 rounded-full">
                  <ArrowLeft />
                  <span className="text-md flex-1">Вернуться назад</span>
                </Button>
              </SheetClose>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <SheetFooter className="p-0 bg-white border-t border-gray-300">
            <div className="p-6 w-full space-y-2 flex flex-col gap-2">
              <div>
                <div className="flex items-center justify-between gap-2 text-sm font-bold text-xs">
                  <span>{items.length} Товара</span>
                  <span>{totalPrice} тг.</span>
                </div>
                <div className="flex items-center justify-between gap-2 text-sm font-bold text-xs">
                  <span>Налог 5%</span>
                  <span>{taxCalculate(totalPrice!)} тг.</span>
                </div>
              </div>

              <div className="flex-1 border-b border-gray-200" />

              <div className="flex items-center justify-between gap-2 text-sm font-bold">
                <span className="text-lg font-semibold">Сумма заказа</span>
                <span className="text-lg font-semibold">
                  {itemsPriceWithTax} тг.
                </span>
              </div>

              <Link href={"/checkout"} className="">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 flex h-12 rounded-full">
                  <span className="text-lg flex-1">К оформлению заказа</span>
                  <ChevronRight className="size-6 text-white" />
                </Button>
              </Link>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
