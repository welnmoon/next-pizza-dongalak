import Container from "@/components/Container";
import ProductCard from "@/components/FilterAndProducts/ProductCard";
import ProductDetail from "@/components/Modals/ProductDetail/ProductDetail";
import { prisma } from "@/prisma/prisma-client";

export default async function ProductPage({ params }) {
  const product = await prisma.product.findFirst({
    where: { id: Number(params.id) },
    include: {
      ingredients: true,
      items: true,
      category: {
        include: {
          products: {
            include: {
              items: true,
              ingredients: true,
            },
          },
        },
      },
    },
  });

  if (!product) return null;

  return (
    <div className="">
      <Container>
        <ProductDetail
          product={product}
          ingredients={product.ingredients}
          items={product.items}
        />
        {product.category.products.length > 1 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold mb-4">Из этой категории</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {product.category.products
                .filter((p) => p.id !== product.id)
                .map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    categoryId={p.categoryId}
                    image={p.imageUrl}
                    ingredients={
                      p.ingredients?.map((i) => i.name).join(", ") || ""
                    }
                    price={product.items[0].price}
                    title={p.name}
                  />
                ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
