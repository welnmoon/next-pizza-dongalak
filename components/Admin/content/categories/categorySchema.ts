import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Название категории должно содержать минимум 2 символа")
    .max(20, "Слишком длинное название"),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;
