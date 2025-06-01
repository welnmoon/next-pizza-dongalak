import CategoriesAndSort from "@/components/CategoriesAndSort/CategoriesAndSort";
import FilterAndProducts from "@/components/FilterAndProducts/FilterAndProducts";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  return (
    <div className="">
      <CategoriesAndSort />
      <FilterAndProducts searchParams={searchParams} />
    </div>
  );
}
