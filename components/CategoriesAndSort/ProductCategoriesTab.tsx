"use client";

import { useActiveCategory } from "@/hooks/useActiveCategory";
import { useCategoryFilterStore } from "@/store/categoryFilterStore";
import { Category } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

const ProductCategoriesTab = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const activeCategory = useActiveCategory(categories.map((c) => c.id));
  const selectedCategory = useCategoryFilterStore((s) => s.selectedCategory);

  const setActiveTab = useCategoryFilterStore((s) => s.toggle);
  const currentCategory = activeCategory ?? selectedCategory;

  const handleClick = (id: number) => {
    setActiveTab(id);
    const element = document.getElementById(`category-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    axios
      .get("/api/categories")
      .then((res) => setCategories(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="bg-[#FFFCF7] w-full rounded-2xl border border-stone-200 px-3 py-2 sm:h-11">
      <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
        {categories.length > 0 ? (
          categories.map((pc) => (
            <button
              key={pc.id}
              className={`px-3 sm:px-4 py-1 sm:h-9 sm:py-0 rounded-2xl shrink-0 text-xs sm:text-sm border border-transparent ${
                currentCategory === pc.id
                  ? "bg-emerald-700 text-white"
                  : "text-stone-700 hover:bg-emerald-50"
              } focus-visible:outline focus-visible:outline-1 focus-visible:outline-emerald-300`}
              onClick={() => handleClick(pc.id)}
            >
              {pc.name}
            </button>
          ))
        ) : (
          <div>
            <Skeleton className="w-125 mb-2 rounded-md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCategoriesTab;
