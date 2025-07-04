import ProductModal from "@/components/Modals/ProductModal";
import { prisma } from "@/prisma/prisma-client";

const ProductModalPage = async ({ params }: { params: { id: string } }) => {
  const product = await prisma.product.findFirst({
    where: { id: Number(params.id) },
    include: {
      ingredients: true,
      items: true,
    },
  });

  if (!product) return null;

  return (
    <ProductModal
      product={product}
      ingredients={product.ingredients}
      items={product.items}
    />
  );
};

export default ProductModalPage;
