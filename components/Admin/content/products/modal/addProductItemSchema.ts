import { z } from "zod";

export const productItemSchema = z.object({
  size: z.number().refine((val) => [20, 30, 40].includes(val), {
    message: "Недопустимый размер",
  }),
  price: z.string().min(1, "Цена должна быть больше нуля"),
  pizzaType: z.number().optional().optional().or(z.literal("")),
});

export type ProductItemSchemaType = z.infer<typeof productItemSchema>;
