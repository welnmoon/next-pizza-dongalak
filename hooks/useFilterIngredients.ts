import { Api } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

interface ReturnProps {
  ingredients: Ingredient[];
}

export const useFilterIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  useEffect(() => {
    Api.ingredients.getAll().then((ingredients) => setIngredients(ingredients));
  }, []);

  return { ingredients };
};
