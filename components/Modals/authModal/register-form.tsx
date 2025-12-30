import { zodResolver } from "@hookform/resolvers/zod";
import { formRegisterSchema, TFormRegisterValues } from "./schema";
import { FormProvider, useForm } from "react-hook-form";
import FormInput from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface Props {
  handleAuthTypeChange: () => void;
}

const RegisterForm = ({ handleAuthTypeChange }: Props) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      const resp = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.message || "Ошибка регистрации");
      }

      toast.success("Вы успешно зарегистрировались");
      handleAuthTypeChange(); // Switch to login form after successful registration
    } catch (error) {
      console.log("error [REGISTER] ", error);
      const message =
        error instanceof Error ? error.message : "Ошибка регистрации";
      toast.error(message);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        <div>
          <h2 className="text-2xl font-bold mb-4">Регистрация</h2>
          <p className="text-stone-600 mb-6">
            Пожалуйста, зарегистрируйтесь для создания учетной записи.
          </p>
        </div>
        {/* Form Inputs */}
        <div className="flex flex-col gap-4">
          <FormInput
            name="fullName"
            label="Полное имя"
            placeholder="Введите ваше полное имя"
          />
          <FormInput
            name="email"
            label="Email"
            placeholder="Введите ваш email"
          />
          <FormInput
            name="password"
            label="Пароль"
            type="password"
            placeholder="Введите пароль"
          />
          <FormInput
            name="confirmPassword"
            label="Подтвердите пароль"
            type="password"
            placeholder="Подтвердите пароль"
          />
        </div>

        <Button className="w-full bg-emerald-700 hover:bg-emerald-800" type="submit">
          Зарегистрироваться
        </Button>

        <div>
          <p className="text-sm text-stone-500 mt-4 text-center">
            Есть аккаунт?{" "}
            <span
              onClick={handleAuthTypeChange}
              className="text-emerald-700 cursor-pointer hover:underline"
            >
              Войдите
            </span>
          </p>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
