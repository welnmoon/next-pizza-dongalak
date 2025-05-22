import Container from "../Container";
import ProductCategoriesTab from "./ProductCategoriesTab";
import Sort from "./Sort";

const CategoriesAndSort = () => {
  return (
    <div className="sticky top-0 bg-white py-5 z-10 shadow-md w-full mb-10">
      <Container className="flex justify-between">
        <ProductCategoriesTab />
        <Sort />
      </Container>
    </div>
  );
};

export default CategoriesAndSort;
