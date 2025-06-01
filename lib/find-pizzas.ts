import { prisma } from "@/prisma/prisma-client";

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 10000;

export const findPizzas = async (
  params: { [key: string]: string | string[] },
  categoryId?: number
) => {
  const parseIds = (value?: string | string[]) => {
    if (!value) return undefined;
    return Array.isArray(value)
      ? value.map(Number).filter(Boolean)
      : value.split(",").map(Number).filter(Boolean);
  };

  const sizes = parseIds(params.selectedPizzaSizes);
  const doughTypes = parseIds(params.selectedPizzaDoughTypes);
  const ingredientsIds = parseIds(params.selectedIngredients);

  const priceRange = Array.isArray(params.selectedPriceRange)
    ? params.selectedPriceRange.map(Number)
    : [Number(params.selectedPriceRange || DEFAULT_MIN_PRICE)];

  const minPrice = priceRange[0] ?? DEFAULT_MIN_PRICE;
  const maxPrice = priceRange[1] ?? DEFAULT_MAX_PRICE;

  const categories = await prisma.category.findMany({
    include: {
      products: {
        orderBy: { id: "desc" },
        where: {
          ...(categoryId ? { categoryId } : {}),
          ...(ingredientsIds
            ? {
                ingredients: {
                  some: { id: { in: ingredientsIds } },
                },
              }
            : {}),
          items: {
            some: {
              price: { gte: minPrice, lte: maxPrice },
              ...(sizes ? { size: { in: sizes } } : {}),
              ...(doughTypes ? { pizzaType: { in: doughTypes } } : {}),
            },
          },
        },
        include: {
          ingredients: true,
          items: {
            where: {
              price: {
                gte: minPrice,
                lte: maxPrice,
              },
            },
            orderBy: {
              price: "asc",
            },
          },
        },
      },
    },
  });

  return categories;
};
