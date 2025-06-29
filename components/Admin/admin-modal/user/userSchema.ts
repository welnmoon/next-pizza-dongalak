import { z } from "zod";

export const userSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Имя слишком короткое")
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
    address: z.string().min(5, "Адрес слишком короткий").optional(),
    password: z
      .string()
      .min(6, "Минимум 6 символов")
      .max(20, "Максимум 20 символов")
      .optional()
      .or(z.literal("")),
    confirmPassword: z
      .string()
      .min(6, "Минимум 6 символов")
      .max(20, "Максимум 20 символов")
      .optional()
      .or(z.literal("")),
    role: z.enum(["USER", "ADMIN"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type UserSchemaType = z.infer<typeof userSchema>;
