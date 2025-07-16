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
  const base = items.find(
    (i) => i.pizzaType === selectedDoughTypes && i.size === selectedSize
  );

  const ingredientsPrice = selectedIngredients.reduce(
    (sum, cur) => sum + cur.price,
    0
  );

  return (base?.price! || 0) + ingredientsPrice;
};
