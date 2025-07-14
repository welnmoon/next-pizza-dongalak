"use server";

import Ingredients from "@/components/Admin/content/ingredients/ingredients";
import { prisma } from "@/prisma/prisma-client";

const IngredientsPage = async () => {
  const ingredients = await prisma.ingredient.findMany();
  return <Ingredients ingredients={ingredients} />;
};

export default IngredientsPage;
