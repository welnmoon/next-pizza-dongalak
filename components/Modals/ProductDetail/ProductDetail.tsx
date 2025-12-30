"use client";
import { useState } from "react";
import LeftSide from "../LeftSide";
import RightSide from "../RightSide";
import { Ingredient, Product, ProductItem } from "@prisma/client";
import { useModalLogic } from "@/hooks/useModalLogic";

interface Props {
  product: Product;
  ingredients: Ingredient[];
  items: ProductItem[];
}

const ProductDetail = ({ product, ingredients, items }: Props) => {
  const initialSize = items.find((i) => i.size !== null)?.size ?? 30;
  const initialDoughType = items.find((i) => i.pizzaType !== null)?.pizzaType ?? 1;
  const [selectedSize, setSelectedSize] = useState(initialSize);
  const [selectedDoughTypes, setSelectedDoughTypes] =
    useState(initialDoughType);
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    []
  );
  const { total, availablePizzaSizes, handleSetSelectedIngredients } =
    useModalLogic({
      items,
      selectedSize,
      selectedDoughTypes,
      selectedIngredients,
      setSelectedDoughTypes,
      setSelectedIngredients,
    });
  return (
    <div
      className="
          w-[95vw] sm:w-[500px] md:w-[800px] lg:w-[800px] xl:w-[800px]
          h-[95vh] md:h-[72vh] max-h-[90vh]
           bg-[#FFFCF7] block md:flex rounded-3xl
          overflow-y-auto md:overflow-hidden items-center
          p-0 m-auto mt-10
        "
    >
      {/* Левая часть — картинка */}
      <LeftSide selectedSize={selectedSize} product={product} />

      {/* Правая часть — прокручиваемая */}
      <RightSide
        classNames={"rounded-3xl"}
        selectedSize={selectedSize}
        product={product}
        availablePizzaSizes={availablePizzaSizes}
        setSelectedSize={setSelectedSize}
        items={items}
        selectedDoughTypes={selectedDoughTypes}
        setSelectedDoughTypes={setSelectedDoughTypes}
        selectedIngredients={selectedIngredients}
        ingredients={ingredients}
        handleSetSelectedIngredients={handleSetSelectedIngredients}
        total={total}
      />
    </div>
  );
};

export default ProductDetail;
