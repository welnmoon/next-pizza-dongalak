import ProductGroupList from "../ProductGroupList";

const Products = () => {
  return (
    <div className="flex flex-col gap-20">
      <ProductGroupList categoryId="pizzas" title="Пиццы" key={1} />
      <ProductGroupList categoryId="pizzas" title="Пиццы" key={2} />
    </div>
  );
};

export default Products;
