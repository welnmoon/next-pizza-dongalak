"use client";

import { useState } from "react";

const ProductCategoriesTab = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="bg-gray-50 inline-block p-1 rounded-2xl h-10">
      <div className="flex gap-2">
        {/* {productCategories.map((pc) => (
          <button
            key={pc.value}
            className={` px-4 rounded-2xl h-8 ${
              activeTab === pc.value
                ? "bg-white shadow-neutral-200 shadow-md"
                : ""
            } focus-visible:outline focus-visible:outline-1 focus-visible:outline-orange-300`}
            onClick={() => setActiveTab(pc.value)}
          >
            {pc.label}
          </button>
        ))} */}
      </div>
    </div>
  );
};

export default ProductCategoriesTab;
