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
import toast from "react-hot-toast";

interface UserProfile {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const ProfileClient = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

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

      const data: UserProfile = await res.json();

      // if (!data.email) {
      //   redirect("/auth/not-authenticated");
      // } // надо на сервере проверять

      // Если нет данных, то редирект на страницу авторизации
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

  const onSubmit = async (data: ProfileSchemaType) => {
    setLoading(true);
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        number: data.number,
        address: data.address,
        password: data.password,
      }),
    });

    if (res.ok) {
      const updated: UserProfile = await res.json();
      setUser(updated);
      form.reset({
        fullName: updated.fullName || "",
        address: updated.address || "",
        number: updated.phone || "",
        password: "",
        confirmPassword: "",
      });
    }
    setLoading(false);
    toast.success("Профиль успешно обновлен!");
  };
  return (
    <>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6 mt-10" style={{ width: "400px" }}>
            <FormInput
              name="fullName"
              label="ФИО"
              required
              placeholder="Фамилия"
            />
            <FormInput
              name="number"
              label="Номер телефона"
              disabled={true}
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              placeholder="Номер телефона"
            />

            <FormInput
              name="address"
              label="Адрес"
              placeholder="Ваш адрес"
              type="email"
            />
            <FormInput
              name="password"
              label="Пароль"
              required
              placeholder="Новый пароль"
            />
            <FormInput
              name="confirmPassword"
              label="Подтвердите пароль"
              required
              placeholder="87071234567"
            />
            <Button type="submit">
              {loading ? "Сохраняем..." : "Сохранить"}
            </Button>
          </div>
        </form>
      </FormProvider>

      <SignOutButton />
    </>
  );
};

export default ProfileClient;
