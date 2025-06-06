"use client";

import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Minus, Plus, X } from "lucide-react";

import formatProductDescription from "@/lib/formatProductDescription";
import { FlatCartItem, useCartStore } from "@/store/cartState";

interface Props {
  item: FlatCartItem;
}

const CartSectionItem = ({ item }: Props) => {
  const items = useCartStore((s) => s.items);
  const updateItemQuantity = useCartStore((s) => s.updateItemQuantity);
  const removeCartItem = useCartStore((s) => s.removeCartItem);

  const [removing, setRemoving] = useState(false);

  const isLastItem = items[items.length - 1].id === item.id ? true : false;

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
      className="w-full bg-white"
    >
      <div className="flex gap-2 items-center justify-between p-4">
        <div className="flex gap-2 w-1/2">
          <img
            src={freshItem.imageUrl}
            alt=""
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex flex-col flex-1">
            <h2 className="text-lg text-gray-800 font-bold">
              {freshItem.name}
            </h2>
            <p className="text-xs text-gray-500">{itemDesc}</p>
          </div>
        </div>
        {/*total*/}
        <h3 className="text-lg font-bold text-gray-800">{itemTotalPrice} ₸</h3>

        <div className="flex gap-2">
          {/*+ -*/}
          <div className="bg-gray-100 rounded-full h-8 flex gap-3 px-2 py-1 items-center">
            <Minus
              onClick={() => handleChangeQuantity("-")}
              className={`size-4 cursor-pointer ${
                freshItem.quantity < 2 && "text-gray-300"
              }`}
            />
            <span>{freshItem.quantity}</span>
            <Plus
              onClick={() => handleChangeQuantity("+")}
              className="size-4 cursor-pointer"
            />
          </div>
          {/*delete*/}
          <X
            onClick={handleRemove}
            width={20}
            height={20}
            className="text-red-500 cursor-pointer"
          />
        </div>
      </div>

      {!isLastItem && <div className="flex-1 border-b border-gray-200" />}
    </motion.div>
  );
};

export default CartSectionItem;
