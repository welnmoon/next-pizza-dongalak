import { FlatCartItem } from "@/store/cartState";
import Title3 from "./Title3";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";

import CartSectionItem from "./CartSectionItem";
import CheckoutCartSkeleton from "./CheckboxCartSkeleton";

interface Props {
  items: FlatCartItem[];
  loading: boolean;
}

const CartSection = ({ loading, items }: Props) => {
  return (
    <div className="bg-white rounded-md w-full">
      <div className="p-4">
        <Title3 title="1. Корзина" />
      </div>

      <hr className="w-full" />

      <div className="p-4">
        {loading ? (
          <div>
            {[...Array(3)].map((_, idx) => (
              <CheckoutCartSkeleton key={idx} />
            ))}
          </div>
        ) : (
          <div>
            {items.length > 0 ? (
              <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
                <AnimatePresence>
                  {items.map((i) => (
                    <CartSectionItem key={i.id} item={i} />
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
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSection;
