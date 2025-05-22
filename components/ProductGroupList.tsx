import ProductCard from "./ProductCard";

interface Props {
  title: string;
  categoryId: string;
  products?: {
    id: string;
    title: string;
    price: number;
    ingredients: string;
    image: string;
    categoryId: string;
  }[];
}

const ProductGroupList = ({ categoryId, products, title }: Props) => {
  return (
    <div className="w-full">
      <h1 className="font-semibold text-2xl mb-4">{title}</h1>
      <div className="grid grid-cols-3 gap-10 w-full">
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
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
