import { z } from "zod";

export const checkoutSchema = z.object({
  name: z.string().min(2, "Имя слишком короткое"),
  lastName: z.string().min(2, "Фамилия слишком короткая"),
  email: z.string().email("Некорректный email"),
  number: z
    .string()
    .regex(/^\d+$/, "Введите только цифры")
    .min(10, "Минимум 10 цифр"),
  adress: z
    .string()
    .min(5, "Адрес слишком короткий")
    .max(100, "Адрес слишком длиннный"),
  comment: z.string().max(500, "Слишком длинний комментарий").optional(),
});

export type ChekoutSchema = z.infer<typeof checkoutSchema>;
