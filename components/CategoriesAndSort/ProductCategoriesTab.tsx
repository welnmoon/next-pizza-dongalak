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

  const setActiveTab = useCategoryFilterStore((s) => s.toggle);

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
    <div className="bg-gray-50 inline-block p-1 rounded-2xl h-10">
      <div className="flex gap-2">
        {categories.length > 0 ? (
          categories.map((pc) => (
            <button
              key={pc.id}
              className={` px-4 rounded-2xl h-8 ${
                activeCategory === pc.id
                  ? "bg-white shadow-neutral-200 shadow-md"
                  : ""
              } focus-visible:outline focus-visible:outline-1 focus-visible:outline-orange-300`}
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
