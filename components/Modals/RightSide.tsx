import { cn } from "@/lib/utils";
import { Ingredient, Product, ProductItem } from "@prisma/client";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { DialogTitle } from "../ui/dialog";
import { PIZZA_TYPE_LABELS } from "@/prisma/constants";
import { CircleCheck } from "lucide-react";
import { useCartStore } from "@/store/cartState";
import { addItemToCart } from "@/services/cart";

interface Props {
  classNames?: string;
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
  classNames,
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
  const addCartItem = useCartStore((s) => s.addCartItem);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const matchRules: Record<number, (item: ProductItem) => boolean> = {
    1: (item) =>
      item.size === selectedSize && item.pizzaType === selectedDoughTypes, // Пиццы
    2: () => true, // Напитки (только один вариант)
    3: () => true, // Десерты
    4: () => true, // Соусы
  };

  const matchFn = matchRules[product.categoryId] || (() => true); // fallback

  const matchedItem = items.find(matchFn);

  const handleAddToCart = async () => {
    if (!matchedItem) return alert("Такой товар не найден!");
    setIsLoading(true);

    try {
      await addCartItem(matchedItem, selectedIngredients);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsLoading(false);
      setIsSuccess(false);
      console.error(error);
    }

    setTimeout(() => setIsSuccess(false), 3000);
  };
  return (
    <div
      className={cn(
        "w-full h-full md:w-1/2 flex flex-col py-8 px-4 bg-orange-50",
        classNames
      )}
    >
      <div className="flex-1 overflow-y-auto pr-1">
        <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
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
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className={cn(
          "mt-6 text-white text-sm py-3 w-full rounded-xl font-semibold transition flex items-center justify-center",
          isSuccess ? "bg-orange-500" : "bg-orange-500 hover:bg-orange-600"
        )}
      >
        {isLoading ? (
          <div className="loader border-white w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
        ) : isSuccess ? (
          <CircleCheck className="text-white w-5 h-5" />
        ) : (
          `Добавить в корзину за ${matchedItem?.price} ₸`
        )}
      </button>
    </div>
  );
};

export default RightSide;
