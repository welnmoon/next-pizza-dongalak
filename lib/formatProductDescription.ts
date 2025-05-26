import { PIZZA_TYPE_LABELS } from "@/prisma/constants";
import { Ingredient } from "@prisma/client";

interface Props {
  ingredients: Ingredient[];
  size: number;
  pizzaType: number;
}

export default function formatProductDescription({
  ingredients,
  size,
  pizzaType,
}: Props) {
  if (size == null || pizzaType == null) return "Описание недоступно";

  const dough = pizzaType
    ? PIZZA_TYPE_LABELS[pizzaType] ?? "Неизвестное тесто"
    : "Неизвестное тесто";

  const sizeText = size ? `${size} см` : "Неизвестный размер";

  const ingText =
    ingredients.length > 0
      ? ingredients.map((i) => i.name).join(", ")
      : "без ингредиентов";

  return `${sizeText}, ${dough.toLowerCase()} тесто, ${ingText.toLowerCase()}`;
}
