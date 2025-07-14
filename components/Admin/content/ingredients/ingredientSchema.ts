import { z } from "zod";

export const IngredientSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
});

export type IngredientSchemaType = z.infer<typeof IngredientSchema>;
