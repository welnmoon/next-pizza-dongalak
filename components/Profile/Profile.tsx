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
import ProfileForm from "./profile-form";

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

  const isChanged =
    watched.fullName !== user?.fullName ||
    watched.email !== user.email ||
    watched.phone !== user.phone ||
    watched.address !== user.address ||
    watched.password !== "" ||
    watched.confirmPassword !== "";

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
      
      if (!data) {
        redirect("/auth/not-authenticated");
      }
      setUser(data);
      form.reset({
        fullName: data.fullName || "",
        email: data.email || "",
        address: data.address || "",
        phone: data.phone || "",
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
  return (
    <>
      <FormProvider {...form}>
        <ProfileForm
          onSubmit={onSubmit}
          loading={loading}
          isChanged={isChanged}
        />
      </FormProvider>

      <SignOutButton />
    </>
  );
};

export default ProfileClient;
