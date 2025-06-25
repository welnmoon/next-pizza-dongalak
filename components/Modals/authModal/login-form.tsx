import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/Checkout/Form/FormInput";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

interface Props {
  setOpen: (open: boolean) => void;
  handleAuthTypeChange: () => void;
}

const LoginForm = ({ setOpen, handleAuthTypeChange }: Props) => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl: "/home",
      });

      if (!resp?.ok) {
        throw new Error(resp?.error || "Не удалось войти в аккаунт");
      }

      toast.success("Вы успешно вошли в аккаунт");
      setOpen(false);
    } catch (error) {
      console.log("error [LOGIN] ", error);
      toast.error("Не удалось войти в аккаунт");
    }
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        {/*Header*/}
        <div>
          <h2 className="text-2xl font-bold mb-2">Авторизация</h2>
          <p className="text-gray-600 mb-6">
            Пожалуйста, войдите в свою учетную запись.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <FormInput name="email" label="Email" placeholder="Email" />
          <FormInput name="password" label="Пароль" placeholder="Password" />
        </div>

        <Button className="w-full bg-orange-500" type="submit">
          Войти
        </Button>

        {/*Providers*/}
        <div className="flex gap-4 w-full">
          <Button
            onClick={() => signIn("github", { callbackUrl: "/home" })}
            className=" w-1/2 px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
          >
            Войти с GitHub
          </Button>
          <Button
            onClick={() => signIn("google", { callbackUrl: "/home" })}
            className="w-1/2 px-4 py-2 bg-white text-black rounded hover:bg-orange-600"
          >
            Войти с Google
          </Button>
        </div>
        {/*Change Type*/}
        <p className="text-sm text-gray-500 mt-4 text-center">
          Нет аккаунта?{" "}
          <span
            onClick={handleAuthTypeChange}
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Зарегистрируйтесь
          </span>
        </p>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
