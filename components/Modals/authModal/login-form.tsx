import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/Checkout/Form/FormInput";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CircleCheck } from "lucide-react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

const LoginForm = () => {
  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  let buttonContent;
  if (isLoading) {
    buttonContent = (
      <div className="loader border-white w-5 h-5 border-2 border-t-transparent rounded-full animate-spin" />
    );
  } else if (isSuccess) {
    buttonContent = <CircleCheck className="text-white w-5 h-5" />;
  }

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });
    } catch (error) {
      console.log("error [LOGIN] ", error);
      toast.error("Не удалось войти в аккаунт");
    }
  };
  return (
    <FormProvider {...form}>
      <form action="" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput name="email" label="Email" placeholder="Email" />
        <FormInput name="password" label="Пароль" placeholder="Password" />

        <Button>{buttonContent}</Button>
      </form>
    </FormProvider>
  );
};

export default LoginForm;
