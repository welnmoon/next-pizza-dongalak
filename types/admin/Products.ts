import { Prisma } from "@prisma/client";

export type ProductWithIngredientsItemsCategories = Prisma.ProductGetPayload<{
  include: {
    items: true;
    ingredients: true;
    category: true;
  };
}>;
