import ProductCard from "./ProductCard";

interface Props {
  groupTitle: string;
  categoryId: number;
  products: {
    id: number;
    title: string;
    price: number;
    ingredients: string;
    image: string;
    categoryId: number;
  }[];
}

const ProductGroupList = ({ categoryId, products, groupTitle }: Props) => {
  const filteredProducts = products.filter((p) => p.categoryId === categoryId);
  console.log(filteredProducts);

  return (
    <div className="w-full">
      <h1 className="font-semibold text-xl sm:text-2xl mb-3 sm:mb-4 text-stone-900">
        {groupTitle}
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 w-full">
        {filteredProducts?.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              categoryId={product?.categoryId}
              image={product.image}
              ingredients={product.ingredients}
              price={product.price}
              title={product.title}
            />
          ))
        ) : (
          <p className="text-stone-500 italic text-xs sm:text-sm">
            Ничего не найдено
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductGroupList;
