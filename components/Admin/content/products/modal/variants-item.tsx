import { PIZZA_TYPE_LABELS } from "@/prisma/constants";
import { ProductItem } from "@prisma/client";

interface Props {
  variant: ProductItem;
}

const VariantsItem = ({ variant }: Props) => {
  const isPizza: boolean = variant.pizzaType !== null && variant.size !== null;
  return (
    <div
      key={variant.id}
      className="w-max bg-gray-100 px-4 py-2 rounded-lg flex items-center justify-between gap-4"
    >
      <div>
        {isPizza ? (
          <p className="text-sm text-gray-600">
            {variant.size} см • {PIZZA_TYPE_LABELS[variant.pizzaType || 1]}
          </p>
        ) : (
          <p>
            Вариант 1{" "}
            <span className="text-sm text-gray-500">
              (Этот продукт может иметь лишь 1 вариант)
            </span>
          </p>
        )}

        <p className="font-semibold">{variant.price} ₸</p>
      </div>
    </div>
  );
};

export default VariantsItem;
