import { useEffect } from "react";
import { Ingredient, ProductItem } from "@prisma/client";
import { calculateTotalPrice } from "@/lib/calculateTotalPrice";

interface Params {
  items: ProductItem[];
  selectedSize: number;
  selectedDoughTypes: number;
  selectedIngredients: Ingredient[];
  setSelectedDoughTypes: (val: number) => void;
  setSelectedIngredients: (val: Ingredient[]) => void;
}

export const useModalLogic = ({
  items,
  selectedSize,
  selectedDoughTypes,
  selectedIngredients,
  setSelectedDoughTypes,
  setSelectedIngredients,
}: Params) => {
  // Обновление теста при смене размера
  useEffect(() => {
    const availableTypes = items
      .filter((i) => i.size === selectedSize)
      .map((i) => i.pizzaType)
      .filter((id): id is number => id !== null);

    if (availableTypes.length === 0) return;

    if (!availableTypes.includes(selectedDoughTypes)) {
      setSelectedDoughTypes(availableTypes[0]);
    }
  }, [selectedSize, items, selectedDoughTypes, setSelectedDoughTypes]);

  //Доступные размеры
  const availablePizzaSizes = [
    ...new Set(items.map((i) => i.size).filter(Boolean)),
  ] as number[];

  // Обработчик выбора ингредиентов
  const handleSetSelectedIngredients = (ingredient: Ingredient) => {
    if (selectedIngredients.some((i) => i.id === ingredient.id)) {
      setSelectedIngredients(
        selectedIngredients.filter((i) => i.id !== ingredient.id)
      );
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  //Подсчёт суммы
  const total = calculateTotalPrice({
    items,
    selectedSize,
    selectedDoughTypes,
    selectedIngredients,
  });

  return {
    availablePizzaSizes,
    total,
    handleSetSelectedIngredients,
  };
};
