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
import { cn } from "@/lib/utils";
import qs from "qs";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";

interface FilterProps {
  className?: string;
  showTitle?: boolean;
}

const Filter = ({ className, showTitle = true }: FilterProps) => {
  const { ingredients } = useFilterIngredients();
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();

  const selectedCategory = useCategoryFilterStore((s) => s.selectedCategory);
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

  const query = useMemo(() => {
    const existing = qs.parse(searchParamsString);

    return qs.stringify(
      {
        ...existing,
        selectedCategory,
        selectedPriceRange,
        selectedPizzaSizes: selectedPizzaSizes.size
          ? Array.from(selectedPizzaSizes)
          : undefined,
        selectedPizzaDoughTypes: selectedPizzaDoughTypes.size
          ? Array.from(selectedPizzaDoughTypes)
          : undefined,
        selectedIngredients: selectedIngredients.size
          ? Array.from(selectedIngredients)
          : undefined,
      },
      {
        arrayFormat: "repeat",
        skipNulls: true,
      }
    );
  }, [
    searchParamsString,
    selectedCategory,
    selectedPriceRange,
    selectedPizzaSizes,
    selectedPizzaDoughTypes,
    selectedIngredients,
  ]);

  useEffect(() => {
    router.replace(`?${query}`, { scroll: false });
  }, [query, router]);

  return (
    <div className={cn("w-full", className)}>
      {showTitle && (
        <h2 className="font-semibold text-lg sm:text-xl mb-4">Фильтрация</h2>
      )}
      <div className="flex flex-col gap-5 sm:gap-6">
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
