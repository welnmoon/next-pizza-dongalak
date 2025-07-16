import { findPizzas } from "@/lib/find-pizzas";
import ProductGroupList from "./ProductGroupList";
import { prisma } from "@/prisma/prisma-client";

interface Props {
  searchParams: { [key: string]: string | string[] };
}

const filteredPizzaCategoryId = 1; // или динамически получай

const Products = async ({ searchParams }: Props) => {
  const filteredPizzas = await findPizzas(searchParams);

  const categories = await prisma.category.findMany();

  return (
    <div className="flex flex-col gap-20">
      {categories.map(async (cat) => {
        let products: {
          id: number;
          title: string;
          price: number;
          image: string;
          categoryId: number;
          ingredients: string;
        }[] = [];

        if (cat.id === filteredPizzaCategoryId) {
          // Фильтрованные пиццы
          const filteredCategory = filteredPizzas.find((c) => c.id === cat.id);

          if (filteredCategory) {
            products = filteredCategory.products.map((product) => ({
              id: product.id,
              title: product.name,
              price: product.items?.[0]?.price || 0,
              image: product.imageUrl || "",
              categoryId: product.categoryId || 0,
              ingredients:
                product.ingredients?.map((i) => i.name).join(", ") || "",
            }));
          }
        } else {
          // Все остальные продукты без фильтра
          const dbProducts = await prisma.product.findMany({
            where: {
              categoryId: cat.id,
              items: {
                some: {
                  price: {
                    gt: 0,
                  },
                },
              },
            },
            include: {
              ingredients: true,
              items: true,
            },
          });

          products = dbProducts.map((product) => ({
            id: product.id,
            title: product.name,
            price: product.items?.[0]?.price || 0,
            image: product.imageUrl || "",
            categoryId: product.categoryId,
            ingredients: product.ingredients.map((i) => i.name).join(", "),
          }));
        }

        return (
          <div key={cat.id} id={`category-${cat.id}`} className="scroll-mt-24">
            <ProductGroupList
              categoryId={cat.id}
              groupTitle={cat.name}
              products={products}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Products;
