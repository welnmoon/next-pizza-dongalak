import { Ingredient, ProductItem } from "@prisma/client";

interface Props {
  items: ProductItem[];
  selectedSize: number;
  selectedDoughTypes: number;
  selectedIngredients: Ingredient[];
}

export const calculateTotalPrice = ({
  items,
  selectedSize,
  selectedIngredients,
  selectedDoughTypes,
}: Props): number => {
  const base = items.find((i) => {
    const sizeMatch = i.size === null || i.size === selectedSize;
    const doughMatch = i.pizzaType === null || i.pizzaType === selectedDoughTypes;
    return sizeMatch && doughMatch;
  });

  const ingredientsPrice = selectedIngredients.reduce(
    (sum, cur) => sum + cur.price,
    0
  );

  if (!base) {
    const fallback = items[0];
    return fallback ? fallback.price + ingredientsPrice : ingredientsPrice;
  }

  return base.price + ingredientsPrice;
};
