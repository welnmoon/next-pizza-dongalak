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
      <h1 className="font-semibold text-2xl mb-4">{groupTitle}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              categoryId={product.categoryId}
              image={product.image}
              ingredients={product.ingredients}
              price={product.price}
              title={product.title}
            />
          ))
        ) : (
          <p className="text-gray-500 italic">Ничего не найдено</p>
        )}
      </div>
    </div>
  );
};

export default ProductGroupList;
