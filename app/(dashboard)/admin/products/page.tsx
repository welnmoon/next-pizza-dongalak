import Products from "@/components/Admin/content/products/Products";
import { prisma } from "@/prisma/prisma-client";
import { ProductWithIngredientsItemsCategories } from "@/types/admin/Products";
import { FormSelectOptions } from "@/types/Form/FormSelect";

const ProductsPage = async () => {
  const products: ProductWithIngredientsItemsCategories[] =
    await prisma.product.findMany({
      include: {
        items: true,
        ingredients: true,
        category: true,
      },
    });

  const categories = await prisma.category.findMany();
  const allIngredients = await prisma.ingredient.findMany();

  const categoryOptions: FormSelectOptions[] = categories.map((c) => ({
    label: c.name,
    value: c.id,
  }));

  if (!products || !categories || !allIngredients) {
    return <div>Нет данных для отображения</div>;
  }

  return (
    <Products
      products={products}
      categories={categoryOptions}
      allIngredients={allIngredients}
    />
  );
};

export default ProductsPage;
