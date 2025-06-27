import CategoriesAndSort from "@/components/CategoriesAndSort/CategoriesAndSort";
import FilterAndProducts from "@/components/FilterAndProducts/FilterAndProducts";
import Stories from "@/components/stories/Stories";

export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) {
  return (
    <div className="">
      <CategoriesAndSort />
      <Stories />
      <FilterAndProducts searchParams={searchParams} />
    </div>
  );
}
