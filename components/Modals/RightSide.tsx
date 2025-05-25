import { cn } from "@/lib/utils";
import { Ingredient, Product, ProductItem } from "@prisma/client";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { DialogTitle } from "../ui/dialog";
import { PIZZA_TYPE_LABELS } from "@/prisma/constants";
import { CircleCheck } from "lucide-react";

interface Props {
  product: Product;
  selectedSize: number;
  availablePizzaSizes: number[];
  setSelectedSize: Dispatch<SetStateAction<number>>;
  items: ProductItem[];
  selectedDoughTypes: number;
  setSelectedDoughTypes: Dispatch<SetStateAction<number>>;
  ingredients: Ingredient[];
  selectedIngredients: Ingredient[];
  handleSetSelectedIngredients: (ingredient: Ingredient) => void;
  total: number;
}

const RightSide = ({
  product,
  selectedSize,
  availablePizzaSizes,
  setSelectedSize,
  items,
  selectedDoughTypes,
  setSelectedDoughTypes,
  selectedIngredients,
  total,
  ingredients,
  handleSetSelectedIngredients,
}: Props) => {
  const totalPrice = total;
  return (
    <div className="w-full h-full md:w-1/2 flex flex-col py-8 px-4 bg-gray-100">
      <div className="flex-1 overflow-y-auto pr-1">
        <DialogTitle className="text-2xl font-bold mb-1">
          {product.name}
        </DialogTitle>
        {product.categoryId === 1 && (
          <p className="text-sm text-gray-500 mb-4">
            {selectedSize} см, {PIZZA_TYPE_LABELS[selectedDoughTypes]} тесто
          </p>
        )}

        {/* Размеры и тесто */}
        {product.categoryId === 1 && (
          <div className="">
            <div className="flex gap-2 mb-2 w-full flex">
              {availablePizzaSizes.map((label) => (
                <button
                  key={label}
                  className={cn(
                    "px-4 py-1 rounded-full border text-sm flex-1",
                    label === selectedSize && "bg-orange-100 border-orange-500"
                  )}
                  onClick={() => setSelectedSize(label)}
                >
                  {label} см.
                </button>
              ))}
            </div>

            <div className="flex gap-2 mb-5 flex w-full">
              {Object.entries(PIZZA_TYPE_LABELS).map(([idString, label]) => {
                const id = Number(idString);
                const isAvailable = items.some(
                  (i) => i.size === selectedSize && i.pizzaType === id
                );

                return (
                  <button
                    key={id}
                    className={cn(
                      "px-4 py-1 rounded-full border text-sm flex-1",
                      selectedDoughTypes === id &&
                        isAvailable &&
                        "bg-orange-100 border-orange-500",
                      !isAvailable && "opacity-50 cursor-not-allowed"
                    )}
                    disabled={!isAvailable}
                    onClick={() => isAvailable && setSelectedDoughTypes(id)}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Добавки */}
        {ingredients.length > 0 && (
          <div>
            <p className="text-sm font-semibold mb-2">Добавить по вкусу</p>
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-full  pr-1 pb-2">
              {ingredients.map((ing) => (
                <div
                  key={ing.id}
                  className={cn(
                    "min-w-[90px] relative rounded-xl border bg-white p-2 text-center shadow-sm cursor-pointer hover:border-orange-400 transition",
                    selectedIngredients.includes(ing) && "border-orange-500"
                  )}
                  onClick={() => handleSetSelectedIngredients(ing)}
                >
                  {selectedIngredients.includes(ing) && (
                    <div className="absolute right-[5px] z-10">
                      <CircleCheck width={20} className="text-orange-400" />
                    </div>
                  )}
                  <div className="relative w-full aspect-square mb-1">
                    <Image
                      src={ing.imageUrl}
                      alt={ing.name}
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                  <p className="text-xs">{ing.name}</p>
                  <p className="text-sm font-semibold">{ing.price} ₸</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Кнопка снизу */}
      <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white text-sm py-3 w-full rounded-xl font-semibold transition">
        Добавить в корзину за {totalPrice} ₸
      </button>
    </div>
  );
};

export default RightSide;
