import Container from "../Container";
import Filter from "./Filter";
import Products from "./Products";

const FilterAndProducts = () => {
  return (
    <Container className="flex gap-[60px]">
      <Filter />
      <Products />
    </Container>
  );
};

export default FilterAndProducts;
