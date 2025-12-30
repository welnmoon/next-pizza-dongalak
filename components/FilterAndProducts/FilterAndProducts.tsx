import { Suspense } from "react";
import Container from "../Container";
import Products from "./Products";
import FilterPanel from "./FilterPanel";

const FilterAndProducts = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) => {
  return (
    <Container className="flex flex-col gap-6 lg:flex-row lg:gap-[60px]">
      <FilterPanel />
      <Suspense fallback={<div className="">Loading...</div>}>
        <Products searchParams={searchParams} />
      </Suspense>
    </Container>
  );
};

export default FilterAndProducts;
