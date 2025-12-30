import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { IoLogoGithub } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

interface Props {
  setOpen: (open: boolean) => void;
  handleAuthTypeChange: () => void;
  callbackUrl?: string;
}

const LoginForm = ({
  setOpen,
  handleAuthTypeChange,
  callbackUrl = "/home",
}: Props) => {
  const router = useRouter();
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
        callbackUrl,
      });

      if (!resp?.ok || resp.error) {
        throw new Error(resp?.error || "Не удалось войти в аккаунт");
      }

      toast.success("Вы успешно вошли в аккаунт");
      setOpen(false);
      const targetUrl = resp.url || callbackUrl;
      if (targetUrl) {
        router.push(targetUrl);
      }
      router.refresh();
    } catch (error) {
      console.log("error [LOGIN] ", error);
      const message =
        error instanceof Error ? error.message : "Не удалось войти в аккаунт";
      toast.error(message);
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
          <p className="text-stone-600 mb-6">
            Пожалуйста, войдите в свою учетную запись.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <FormInput name="email" label="Email" placeholder="Email" />
          <FormInput name="password" label="Пароль" placeholder="Password" />
        </div>

        <Button className="w-full bg-emerald-700 hover:bg-emerald-800" type="submit">
          Войти
        </Button>

        {/*Providers*/}
        <div className="flex gap-4 w-full">
          <Button
            onClick={() => signIn("github", { callbackUrl })}
            className="flex gap-2 flex-1 px-4 py-2 bg-stone-900 text-white rounded-xl hover:bg-stone-800"
          >
            <IoLogoGithub />
            Войти с GitHub
          </Button>
          <Button
            onClick={() => signIn("google", { callbackUrl })}
            className="flex gap-2 flex-1 px-4 py-2 bg-[#FFFCF7] text-stone-900 rounded-xl hover:bg-stone-100 border border-stone-200"
          >
            <FcGoogle />
            Войти с Google
          </Button>
        </div>
        {/*Change Type*/}
        <p className="text-sm text-stone-500 mt-4 text-center">
          Нет аккаунта?{" "}
          <span
            onClick={handleAuthTypeChange}
            className="text-emerald-700 cursor-pointer hover:underline"
          >
            Зарегистрируйтесь
          </span>
        </p>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
