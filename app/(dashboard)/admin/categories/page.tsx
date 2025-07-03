import Categories from "@/components/Admin/content/categories/Categories";
import { prisma } from "@/prisma/prisma-client";
import { CategoryWithProducts } from "@/types/admin/Category";

const CategoriesPage = async () => {
  const categories: CategoryWithProducts[] = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true,
        },
      },
    },
  });

  return <Categories categories={categories} />;
};

export default CategoriesPage;
