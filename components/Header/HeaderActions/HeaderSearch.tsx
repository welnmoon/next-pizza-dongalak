"use client";
import { Api } from "@/services/api-client";
import { Product } from "@prisma/client";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

const Search = ({ className }: Props) => {
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [defaultProducts, setDefaultProducts] = useState<Product[]>([]);

  const [searchResult, setSearchResult] = useState<Product[]>([]);

  useDebounce(() => {
    const getSearchedProducts = async () => {
      if (!searchQuery) {
        setSearchResult([]);
        return;
      }

      Api.products.search(searchQuery).then((products) => {
        setSearchResult(products);
      });
    };
    getSearchedProducts();
  }, [searchQuery]);

  useEffect(() => {
    Api.products.search("").then((products) => {
      setDefaultProducts(products);
    });
  }, []);

  const onClickProduct = () => {
    setFocused(false);
    setSearchQuery("");
    setSearchResult([]);
  };

  const hasQuery = searchQuery.trim().length > 0;
  const hasResults = searchResult.length > 0;
  const list = hasQuery ? (hasResults ? searchResult : defaultProducts) : defaultProducts;

  return (
    <div className={cn("relative flex-1 z-30", className)}>
      {/* Затемнение экрана */}
      {focused && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-20"
          onClick={() => setFocused(false)}
        />
      )}

      {/* Контейнер для input и dropdown */}
      <div className="relative w-full h-auto z-30 px-0 sm:px-10">
        {/* Поле поиска */}
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Поиск..."
            className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl bg-[#FFFCF7] text-stone-800 placeholder-stone-400 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            onFocus={() => setFocused(true)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Выпадающий блок */}
        <div
          className={`absolute left-0 right-0 opacity-0 invisible top-14 transition-all duration-200
                      bg-[#FFFCF7] p-4 rounded-2xl shadow-xl border border-stone-200 ${
                        focused ? "opacity-100 visible top-16" : ""
                      }`}
        >
          <div className="relative flex flex-col gap-2">
            {hasQuery && !hasResults && (
              <p className="text-sm text-stone-500">Ничего не найдено</p>
            )}

            {list.slice(0, 5).map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="hover:bg-emerald-50 rounded-xl px-2 py-1 transition duration-200"
                onClick={onClickProduct}
              >
                <div className="relative flex items-center gap-4">
                  <div className="h-10 w-10 relative">
                    <Image
                      alt={product.name}
                      src={product.imageUrl}
                      className="object-contain"
                      fill
                    />
                  </div>
                  <p>{product.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
