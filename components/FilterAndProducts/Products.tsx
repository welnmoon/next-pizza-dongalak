import { prisma } from "@/prisma/prisma-client";
import ProductGroupList from "./ProductGroupList";

const Products = async () => {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          ingredients: true,
          items: true,
        },
      },
    },
  });

  const rawProducts = await prisma.product.findMany({
    include: {
      ingredients: true,
      items: true,
    },
  });

  const mappedProducts = rawProducts.map((product) => ({
    id: product.id,
    title: product.name, // или product.title, если такое есть
    price: product.items?.[0]?.price || 0, // берём первую вариацию
    image: product.imageUrl,
    categoryId: product.categoryId,
    ingredients: product.ingredients.map((i) => i.name).join(", "),
  }));

  return (
    <div className="flex flex-col gap-20">
      {categories.map((cat) => (
        <div key={cat.id} id={`category-${cat.id}`} className="scroll-mt-24">
          {" "}
          {/*id для ссылочного скрола*/}
          <ProductGroupList
            categoryId={cat.id}
            groupTitle={cat.name}
            key={cat.id}
            products={mappedProducts}
          />
        </div>
      ))}
    </div>
  );
};

export default Products;
