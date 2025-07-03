import { Prisma } from "@prisma/client";

export type CategoryWithProducts = Prisma.CategoryGetPayload<{
  include: {
    products: {
      include: {
        items: true;
        ingredients: true;
      };
    };
  };
}>;
