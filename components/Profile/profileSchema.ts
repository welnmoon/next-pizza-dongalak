import { z } from "zod";

export const profileSchema = z
  .object({
    fullName: z.string().min(2, "Имя слишком короткое"),
    number: z
      .string()
      .min(10, "Минимум 10 цифр")
      .max(15, "Максимум 15 цифр")
      .regex(/^\d+$/, "Номер должен содержать только цифры"),
    address: z.string().min(5, "Адрес слишком короткий"),
    password: z
      .string()
      .min(6, "Минимум 6 символов")
      .max(20, "Максимум 20 символов"),
    confirmPassword: z
      .string()
      .min(6, "Минимум 6 символов")
      .max(20, "Максимум 20 символов"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type ProfileSchemaType = z.infer<typeof profileSchema>;
