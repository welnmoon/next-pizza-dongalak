import { z } from "zod";

// export const productItemSchema = z.object({
//   size: z.number().optional(),
//   price: z.number().min(1, "Цена должна быть больше нуля"),
//   pizzaType: z.number().optional(),
// });

// Regular - имеется ввиду что продукт обычный (не пицца)

export const createRegularProductSchema = z.object({
  name: z.string().min(1, "Название обязательно"),
  imageUrl: z.string().min(1, "Ссылка на изображение обязательна"),
  categoryId: z.number(),
});

export type CreateRegularProductType = z.infer<
  typeof createRegularProductSchema
>;
