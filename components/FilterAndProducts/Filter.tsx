"use client";
import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import PriceRangeSlider from "./PriceRangeSlider";
import IngredientCheckboxes from "../Checkbox/IngredientCheckboxes";
import SizesCheckboxes from "../Checkbox/SizesCheckboxes";
import DoughTypeCheckboxes from "../Checkbox/DoughTypeCheckboxes";
import { useCategoryFilterStore } from "@/store/categoryFilterStore";
import { usePriceFilterStore } from "@/store/priceFilterStore";
import { usePizzaSizeFilterStore } from "@/store/pizzaSizeFilterStore";
import { useDoughTypeFilterStore } from "@/store/doughTypeFilterStore";
import { useIngredientFilterStore } from "@/store/ingredientFilterStore";

const Filter = () => {
  const { ingredients } = useFilterIngredients();

  const selectedCategories = useCategoryFilterStore(
    (s) => s.selectedCategories
  );
  const selectedPriceRange = usePriceFilterStore((s) => s.priceRange);
  const selectedPizzaSizes = usePizzaSizeFilterStore(
    (s) => s.selectedPizzaSizes
  );
  const selectedPizzaDoughTypes = useDoughTypeFilterStore(
    (s) => s.selectedPizzaDoughTypes
  );
  const selectedIngredients = useIngredientFilterStore(
    (s) => s.selectedIngredients
  );

  return (
    <div className="lg:w-[250px] md:w-[200px]">
      <h2 className="font-semibold text-xl mb-4">Фильтрация</h2>
      <div className="flex flex-col gap-6">
        <DoughTypeCheckboxes
          data={[
            { id: 1, name: "Традиционное" },
            { id: 2, name: "Тонкое" },
          ]}
        />
        <SizesCheckboxes
          data={[
            { id: 1, name: "20 см" },
            { id: 2, name: "30 см" },
            { id: 3, name: "40 см" },
          ]}
        />
        <PriceRangeSlider />
        <IngredientCheckboxes data={ingredients} />
      </div>
    </div>
  );
};

export default Filter;
