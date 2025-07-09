import { z } from "zod";

export const productItemSchema = z.object({
  size: z.string().optional().or(z.literal("")),
  price: z.string().min(1, "Цена должна быть больше нуля"),
  pizzaType: z.number().optional().optional().or(z.literal("")),
});

export type ProductItemSchemaType = z.infer<typeof productItemSchema>;
