import { z } from "zod";

export const orderWithUserSchema = z.object({
  id: z.number(),
  userId: z.number().nullable(), // может быть null
  token: z.string(),
  totalAmount: z.number(),
  status: z.enum(["PENDING", "SUCCEEDED", "CANCELLED"]),
  paymentId: z.string().nullable(),
  items: z.any(), // если items — это JSON, можно уточнить тип если знаешь структуру
  fullName: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  comment: z.string().nullable(),
  user: z
    .object({
      fullName: z.string(),
      email: z.string(),
    })
    .nullable(), // если заказ может быть без пользователя
});

export type OrderWithUserSchemaType = z.infer<typeof orderWithUserSchema>;
