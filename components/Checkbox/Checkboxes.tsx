interface Item {
  id: number;
  name: string;
}

interface Props {
  data: Item[];
  title?: string;
  has: (id: number) => boolean;
  toggle: (id: number) => void;
  limit?: number;
  needToShowAllButton?: boolean;
}

import { useState } from "react";
import { CheckboxItem } from "./CheckboxItem";
import { Skeleton } from "../ui/skeleton";
import FilterSearch from "../FilterSearch";

const Checkboxes = ({
  data,
  title,
  has,
  toggle,
  limit = data.length,
  needToShowAllButton = false,
}: Props) => {
  const [showAll, setShowAll] = useState(false);

  const [searchValue, setSearchValue] = useState<string>("");

  const filteredData = data.filter((d) =>
    d.name.toLowerCase().includes(searchValue.toLowerCase().trim())
  );

  const visibleData = showAll ? filteredData : data.slice(0, limit);

  return (
    <div className="">
      {title && (
        <h3 className="font-semibold text-base sm:text-lg mb-2 sm:mb-3">
          {title}
        </h3>
      )}
      {needToShowAllButton && showAll && (
        <FilterSearch
          onChange={setSearchValue}
          placeholder="Поиск..."
          value={searchValue}
        />
      )}

      <div className="flex flex-col gap-2">
        {data.length > 0 ? (
          visibleData.map((item) => (
            <CheckboxItem
              checked={has(item.id)}
              id={item.id}
              label={item.name}
              onChange={() => toggle(item.id)}
              key={item.id}
            />
          ))
        ) : (
          <div>
            {[...Array(limit)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-full mb-2 rounded-md" />
            ))}
            <Skeleton className="h-4 w-24 mb-2 rounded-md" />
          </div>
        )}
      </div>

      {needToShowAllButton && data.length > limit && (
        <button
          className="mt-2 text-xs sm:text-sm text-emerald-700 hover:underline"
          onClick={() => setShowAll((prev) => !prev)}
        >
          {showAll ? "Скрыть" : "Показать все"}
        </button>
      )}
    </div>
  );
};

export default Checkboxes;
