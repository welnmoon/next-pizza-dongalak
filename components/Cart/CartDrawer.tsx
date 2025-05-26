import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode, useEffect } from "react";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import CartDrawerItem from "./CartDrawerItem";
import { useCartStore } from "@/store/cartState";

interface Props {
  children: ReactNode;
}

export function CartDrawer({ children }: Props) {
  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const items = useCartStore((state) => state.items);
  const loading = useCartStore((state) => state.loading);
  const error = useCartStore((state) => state.error);

  console.log(items);

  useEffect(() => {0
    fetchCartItems();
  }, [fetchCartItems]);

  if (loading) return <p>Загрузка корзины...</p>;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="!max-w-none w-[430px]  bg-gray-100">
        <SheetHeader>
          <SheetTitle>2 Товара на 10 000 тг</SheetTitle>
        </SheetHeader>
        <div>
          {items.map((i) => (
            <CartDrawerItem item={i}/>
          ))}
        </div>
        <SheetFooter className="p-0 bg-white">
          <div className="p-6 w-full space-y-2 flex flex-col gap-2">
            <div>
              {/* Строка 1 */}
              <div className="flex items-center justify-between gap-2 text-sm font-bold">
                <span className="whitespace-nowrap text-xs">2 Товара</span>
                <span className="whitespace-nowrap text-xs">10 000 тг.</span>
              </div>

              {/* Строка 2 */}
              <div className="flex items-center justify-between gap-2 text-sm font-bold">
                <span className="whitespace-nowrap text-xs">Налог 5%</span>
                <span className="whitespace-nowrap">500 тг.</span>
              </div>
            </div>
            <div className="flex-1 border-b border-gray-200" />

            <div>
              <div className="flex items-center justify-between gap-2 text-sm font-bold">
                <span className="whitespace-nowrap text-lg font-semibold">
                  Сумма заказа
                </span>
                <span className="whitespace-nowrap text-lg font-semibold">
                  500 тг.
                </span>
              </div>
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600 flex h-12 rounded-full">
              <span className="text-lg flex-1">К оформлению заказа</span>
              <ChevronRight className="size-6 text-white" />
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
