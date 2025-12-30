"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Minus, Plus, X } from "lucide-react";

import formatProductDescription from "@/lib/formatProductDescription";
import { FlatCartItem, useCartStore } from "@/store/cartState";

interface Props {
  item: FlatCartItem;
}

const CartDrawerItem = ({ item }: Props) => {
  const items = useCartStore((s) => s.items);
  const updateItemQuantity = useCartStore((s) => s.updateItemQuantity);
  const removeCartItem = useCartStore((s) => s.removeCartItem);

  const [removing, setRemoving] = useState(false);

  // ❗ Хуки вызываются ДО любых условных return'ов
  const freshItem = items.find((i) => i.id === item.id);

  const itemDesc = useMemo(() => {
    if (freshItem?.pizzaType || freshItem?.size) {
      return formatProductDescription({
        ingredients: freshItem.ingredients,
        size: freshItem.size ?? 30,
        pizzaType: freshItem.pizzaType ?? 1,
      });
    } else return "Без описания";
  }, [freshItem]);

  const itemTotalPrice = useMemo(() => {
    if (!freshItem) return 0;
    const base = freshItem.price * freshItem.quantity;
    const toppings = freshItem.ingredients.reduce(
      (acc, ing) => acc + ing.price * freshItem.quantity,
      0
    );
    return base + toppings;
  }, [freshItem]);

  const handleRemove = () => {
    if (!freshItem) return;
    setRemoving(true);
    requestAnimationFrame(() => {
      setTimeout(async () => {
        await removeCartItem(freshItem.id);
      }, 500); // мягкое удаление
    });
  };

  const handleChangeQuantity = (op: "+" | "-") => {
    if (!freshItem) return;
    const quantity =
      op === "+" ? freshItem.quantity + 1 : freshItem.quantity - 1;
    if (quantity < 1) return;
    updateItemQuantity(freshItem.id, quantity);
  };

  // ❗ После хуков — можно безопасно проверять
  if (!freshItem) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 1 }}
      animate={{ opacity: removing ? 0 : 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        layout: { duration: 0.3 },
      }}
      className="w-full bg-[#FFFCF7] rounded-2xl border border-stone-200 shadow-sm"
    >
      <div className="p-3 gap-2 flex flex-col">
        <div className="flex gap-2">
          <img
            src={freshItem.imageUrl}
            alt=""
            className="w-20 h-20 object-cover rounded-xl bg-stone-50"
          />
          <div className="flex flex-col flex-1">
            <h2 className="text-lg text-stone-900 font-bold">
              {freshItem.name}
            </h2>
            <p className="text-xs text-stone-500">{itemDesc}</p>
          </div>
          <X
            onClick={handleRemove}
            width={20}
            height={20}
            className="text-red-500 cursor-pointer"
          />
        </div>

        <div className="flex-1 border-b border-stone-200" />

        <div className="flex justify-between text-stone-500 flex-col gap-1">
          <div>
            <h2 className="text-sm text-stone-600 font-semibold">
              {freshItem.price} ₸ × {freshItem.quantity} шт
            </h2>
            {freshItem.ingredients.length > 0 && (
              <p className="text-xs text-stone-500">
                Добавки:{" "}
                {freshItem.ingredients
                  .map(
                    (ing) => `${ing.name} (${ing.price * freshItem.quantity} ₸)`
                  )
                  .join(", ")}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-900">
              Всего: {itemTotalPrice} ₸
            </h3>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl flex gap-3 px-2 py-1 items-center">
              <Minus
                onClick={() => handleChangeQuantity("-")}
                className="size-4 cursor-pointer"
              />
              <span>{freshItem.quantity}</span>
              <Plus
                onClick={() => handleChangeQuantity("+")}
                className="size-4 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartDrawerItem;
