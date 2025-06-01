import formatProductDescription from "@/lib/formatProductDescription";
import { FlatCartItem, useCartStore } from "@/store/cartState";
import { Minus, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";

interface Props {
  item?: FlatCartItem;
}

const CartDrawerItem = ({ item }: Props) => {
  if (!item) return <p>Пусто</p>;

  const itemDesc = useMemo(() => {
    if (item.pizzaType || item.size) {
      return formatProductDescription({
        ingredients: item.ingredients,
        size: item.size ?? 30,
        pizzaType: item.pizzaType ?? 1,
      });
    } else return "Без описания";
  }, [item]);

  const updateItemQuantity = useCartStore((s) => s.updateItemQuantity);
  const removeCartItem = useCartStore((s) => s.removeCartItem);

  const handleChangeQuantity = (operation: "-" | "+") => {
    const quantity = operation === "+" ? item.quantity + 1 : item.quantity - 1;
    if (quantity < 1) return;
    updateItemQuantity(item.id, quantity);
  };

  const itemTotalPrice = useMemo(() => {
    const basePrice = item.price * item.quantity;
    const ingredientsPrice = item.ingredients.reduce(
      (sum, ing) => sum + ing.price * item.quantity,
      0
    );
    return basePrice + ingredientsPrice;
  }, [item]);

  return (
    <div className="w-full bg-white">
      <div className="p-3 gap-2 flex flex-col">
        <div className="flex gap-2">
          <img src={item.imageUrl} alt="" className="w-20 h-20" />
          <div className="flex flex-col flex-1">
            <h2 className="text-lg text-gray-800 font-bold">{item?.name}</h2>
            <p className="text-xs text-gray-500">{itemDesc}</p>
          </div>
          <X
            onClick={() => removeCartItem(item.id)}
            width={20}
            height={20}
            className="text-red-500 cursor-pointer"
          />
        </div>
        <div className="flex-1 border-b border-gray-200" />
        <div className="flex justify-between text-gray-500 flex-col gap-1">
          <div>
            <h2 className="text-sm text-gray-600 font-semibold">
              {item.price} ₸ × {item.quantity} шт
            </h2>
            {item.ingredients.length > 0 && (
              <p className="text-xs text-gray-500">
                Добавки: {" "}
                {item.ingredients
                  .map((ing) => `${ing.name} (${ing.price * item.quantity} ₸)`)
                  .join(", ")}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-800">
              Всего: {itemTotalPrice} ₸
            </h3>
            <div className="bg-gray-100 rounded-full flex gap-3 px-2 py-1 items-center">
              <Minus
                onClick={() => handleChangeQuantity("-")}
                className="size-4 cursor-pointer"
              />
              <span>{item.quantity}</span>
              <Plus
                onClick={() => handleChangeQuantity("+")}
                className="size-4 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawerItem;
