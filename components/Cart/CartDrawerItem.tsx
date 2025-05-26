import formatProductDescription from "@/lib/formatProductDescription";
import { FlatCartItem } from "@/store/cartState";
import { Product, ProductItem } from "@prisma/client";
import { DoorClosed, Minus, Plus, X } from "lucide-react";

interface Props {
  item?: FlatCartItem;
}

const CartDrawerItem = ({ item }: Props) => {
  if (!item) return <p>Пусто</p>;
  const itemDescription = formatProductDescription({
    ingredients: item.ingredients,
    size: item.size ?? 30,
    pizzaType: item.pizzaType ?? 1,
  });

  return (
    <div className="w-full bg-white">
      <div className="p-3 gap-2 flex flex-col">
        <div className="flex gap-2">
          <img
            src={
              "https://media.dodostatic.net/image/r:233x233/0195dc9a4c9b7351921143730d531529.avif"
            }
            alt=""
            className="w-20 h-20"
          />
          <div className="flex flex-col">
            <h2 className="text-lg text-gray-800 font-bold">{item?.name}</h2>
            <p className="text-xs text-gray-500">{itemDescription}</p>
          </div>
          <X className="size-10" />
        </div>
        <div className="flex-1 border-b border-gray-200" />
        <div className="flex justify-between text-gray-500">
          <h2 className="text-lg text-gray-800 font-bold">3950 тг.</h2>
          <div className="bg-gray-100 rounded-full flex gap-3 px-2 py-1 w-fit items-center">
            <Minus className="size-4 cursor-pointer" />
            <span>4</span>
            <Plus className="size-4 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawerItem;
