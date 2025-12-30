"use client";

import { ArrowUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "qs";

const sortOptions = [
  { value: "rating", label: "рейтингу" },
  { value: "price_asc", label: "цене ↑" },
  { value: "price_desc", label: "цене ↓" },
  { value: "name", label: "алфавиту" },
];

const Sort = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") ?? "rating";

  const handleChange = (value: string) => {
    const query = qs.parse(searchParams.toString());

    if (value === "rating") {
      delete query.sort;
    } else {
      query.sort = value;
    }

    const queryString = qs.stringify(query, {
      arrayFormat: "repeat",
      skipNulls: true,
    });

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className="bg-[#FFFCF7] inline-flex rounded-2xl border border-stone-200 px-3 py-2 w-full sm:w-auto">
      <div className="flex gap-2 items-center h-full font-medium text-xs sm:text-sm text-stone-700">
        <ArrowUpDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        <span>Сортировка:</span>
        <select
          value={currentSort}
          onChange={(e) => handleChange(e.target.value)}
          className="bg-transparent text-emerald-700 font-semibold outline-none cursor-pointer"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sort;
