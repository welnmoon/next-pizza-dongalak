import CategoriesAndSort from "@/components/CategoriesAndSort/CategoriesAndSort";
import FilterAndProducts from "@/components/FilterAndProducts/FilterAndProducts";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div className="">
      <CategoriesAndSort />
      <FilterAndProducts />
    </div>
  );
}
