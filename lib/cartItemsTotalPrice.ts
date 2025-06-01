// lib/cartItemsTotalPrice.ts

import { FlatCartItem } from "@/store/cartState";

interface Props {
  items: FlatCartItem[];
}

export const cartItemsTotalPrice = ({ items }: Props): number => {
  const itemsPrice = items.reduce(
    (sum, cur) => sum + cur.price * cur.quantity,
    0
  );

  const ingredientsPrice = items.reduce(
    (sum, cur) =>
      sum +
      cur.ingredients.reduce(
        (innerSum, ing) => innerSum + ing.price * cur.quantity,
        0
      ),
    0
  );

  return itemsPrice + ingredientsPrice;
};
