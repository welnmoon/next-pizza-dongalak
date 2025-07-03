import { z } from "zod";

export const orderWithUserSchema = z.object({
  id: z.number(),
  userId: z.number().nullable(), // может быть null
  totalAmount: z.number(),
  status: z.enum(["PENDING", "SUCCEEDED", "CANCELLED"]),
  paymentId: z.string().nullable(),
  items: z.any(), // если items — это JSON, можно уточнить тип если знаешь структуру
  fullName: z
    .string()
    .min(2, "Имя слишком короткое")
    .max(20, "Имя слишком длинное")
    .optional()
    .or(z.literal("")),
  email: z.string().email("Некорректный email").optional(),
  phone: z
    .string()
    .min(10, "Минимум 10 цифр")
    .max(15, "Максимум 15 цифр")
    .regex(/^\d+$/, "Номер должен содержать только цифры")
    .optional()
    .or(z.literal("")),
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
