import { Suspense } from "react";
import Container from "../Container";
import Filter from "./Filter";
import Products from "./Products";

const FilterAndProducts = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] };
}) => {
  return (
    <Container className="flex gap-[60px]">
      <Filter />
      <Suspense fallback={<div className="">Loading...</div>}>
        <Products searchParams={searchParams} />
      </Suspense>
    </Container>
  );
};

export default FilterAndProducts;
