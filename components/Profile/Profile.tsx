"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  profileSchema,
  ProfileSchemaType,
} from "@/components/Profile/profileSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import SignOutButton from "../Buttons/SignOutBtn";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import ProfileForm from "./profile-form";
import { Button } from "../ui/button";
import AuthModal from "../Modals/authModal/authModal";

export interface UserProfile {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
}

interface Props {
  data: UserProfile | null;
}

const ProfileClient = ({ data }: Props) => {
  const [user, setUser] = useState<UserProfile | null>(data);
  const [loading, setLoading] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);

  // Восстановление cartToken из localStorage в cookies, если нужно
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("cartToken");
      if (token && !document.cookie.includes("cartToken=")) {
        document.cookie = `cartToken=${token}; path=/; max-age=31536000`;
      }
    }
  }, []);

  // Проверка пользователя при монтировании
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/user/profile");
        if (res.status === 404) {
          const json = await res.json();
          if (json.message === "Пользователь не найден") {
            signOut();
          }
        }
      } catch {}
    };
    checkUser();
  }, []);

  const form = useForm({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watched = form.watch();

  const isChanged = user
    ? watched.fullName !== (user.fullName ?? "") ||
      watched.email !== (user.email ?? "") ||
      watched.phone !== (user.phone ?? "") ||
      watched.address !== (user.address ?? "") ||
      watched.password !== "" ||
      watched.confirmPassword !== ""
    : false;

  useEffect(() => {
    if (data) {
      form.reset({
        fullName: data.fullName || "",
        email: data.email || "",
        address: data.address || "",
        phone: data.phone || "",
        password: "",
        confirmPassword: "",
      });
    } else {
      form.reset({
        fullName: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    }
  }, [data, form]);

  const onSubmit = async (data: ProfileSchemaType) => {
    setLoading(true);
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        password: data.password,
        email: data?.email, // email не меняем, берем из профиля
      }),
    });

    if (res.ok) {
      const updated: UserProfile = await res.json();
      setUser(updated);
      form.reset({
        fullName: updated.fullName || "",
        email: updated.email || "",
        address: updated.address || "",
        phone: updated.phone || "",
        password: "",
        confirmPassword: "",
      });
    }
    setLoading(false);
    toast.success("Профиль успешно обновлен!");
  };

  if (!user) {
    return (
      <div className="mx-auto mt-6 max-w-2xl">
        <div className="rounded-2xl border border-stone-200 bg-[#FFFCF7] p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-2">Профиль недоступен</h2>
          <p className="text-stone-600 mb-4">
            Войдите или зарегистрируйтесь, чтобы видеть историю заказов,
            сохранять адрес доставки и быстрее оформлять покупки.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setOpenAuth(true)}
              className="bg-emerald-700 text-white hover:bg-emerald-800"
            >
              Войти или зарегистрироваться
            </Button>
            <Button variant="outline" onClick={() => setOpenAuth(true)}>
              Восстановить доступ по email
            </Button>
          </div>
        </div>
        <AuthModal
          open={openAuth}
          setOpen={setOpenAuth}
          callbackUrl="/profile"
        />
      </div>
    );
  }
  return (
    <div className="flex mt-10 max-w-4xl flex-col gap-4">
      <div className="rounded-2xl border border-stone-200 bg-[#FFFCF7] p-5 shadow-sm flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-stone-500">Аккаунт</p>
          <h1 className="text-2xl font-bold">{user.fullName || "Без имени"}</h1>
          <p className="text-sm text-stone-500">{user.email}</p>
        </div>
        <SignOutButton />
      </div>

      <FormProvider {...form}>
        <ProfileForm
          onSubmit={onSubmit}
          loading={loading}
          isChanged={isChanged}
        />
      </FormProvider>
    </div>
  );
};

export default ProfileClient;
