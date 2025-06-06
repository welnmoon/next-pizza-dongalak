// lib/cartItemsTotalPrice.ts

import { FlatCartItem } from "@/store/cartState";

interface Props {
  items: FlatCartItem[];
}

export const cartItemsTotalPrice = ({ items }: Props): number => {
  return items.reduce((sum, item) => {
    const base = item.price * item.quantity;

    const ingredientsTotal = item.ingredients.reduce(
      (innerSum, ing) => innerSum + ing.price * item.quantity,
      0
    );

    return sum + base + ingredientsTotal;
  }, 0);
};
