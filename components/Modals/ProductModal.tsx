"use client";

import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { useRouter } from "next/navigation";
import { Ingredient, Product, ProductItem } from "@prisma/client";
import { useState } from "react";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import { useModalLogic } from "@/hooks/useModalLogic";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface Props {
  product: Product;
  ingredients: Ingredient[];
  items: ProductItem[];
}

const ProductModal = ({ product, ingredients, items }: Props) => {
  const router = useRouter();

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

  if (!product) {
    return <div className="absolute w-full h-full bg-stone-200" />;
  }

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent
        className="
          w-[95vw] sm:w-[500px] md:w-[800px] lg:w-[800px] xl:w-[800px]
          h-[95vh] md:h-[72vh] max-h-[90vh]
           bg-[#FFFCF7] block md:flex rounded-3xl
          overflow-y-auto md:overflow-hidden items-center
          p-0
        "
      >
        <VisuallyHidden>
          <DialogTitle>Заголовок</DialogTitle>
        </VisuallyHidden>
        {/* Левая часть — картинка */}
        <LeftSide selectedSize={selectedSize} product={product} />

        {/* Правая часть — прокручиваемая */}
        <RightSide
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
          stickyFooter
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
