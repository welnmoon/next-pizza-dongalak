"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  profileSchema,
  ProfileSchemaType,
} from "@/components/Profile/profileSchema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import FormInput from "../Checkout/Form/FormInput";
import SignOutButton from "../Buttons/SignOutBtn";
import { useSession } from "next-auth/react";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const ProfileClient = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const session = useSession();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await fetch("/api/user/profile", {
        method: "GET",
        cache: "no-store",
      });
      if (!res.ok) {
        if (res.status === 401) {
          redirect("/auth/not-authenticated");
        }
      }
      console.log("User res:", res);
      const data: UserProfile = await res.json();
      console.log("User data:", data);
      if (!data) {
        redirect("/auth/not-authenticated");
      }
      setUser(data);
      form.reset({
        fullName: data.fullName || "",
        address: data.address || "",
        number: data.phone || "",
        password: "",
        confirmPassword: "",
      });
    };
    fetchUserProfile();
  }, []);

  const onSubmit = async (data: ProfileSchemaType) => {};
  return (
    <>
      <FormProvider {...form}>
        {session.data?.user.name}
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput
            name="fullName"
            label="ФИО"
            required
            placeholder="Фамилия"
          />
          <FormInput
            name="number"
            label="Номер телефона"
            required
            placeholder="Фамилия"
          />
          <FormInput
            name="address"
            label="Адрес"
            placeholder="Email"
            type="email"
          />
          <FormInput
            name="password"
            label="Пароль"
            required
            placeholder="87071234567"
          />
          <FormInput
            name="confirmPassword"
            label="Подтвердите пароль"
            required
            placeholder="87071234567"
          />
        </form>
      </FormProvider>
      <Button type="submit">Сохранить</Button>

      <SignOutButton />
    </>
  );
};

export default ProfileClient;
