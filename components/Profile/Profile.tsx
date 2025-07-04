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
import ProfileForm from "./profile-form";

export interface UserProfile {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
}

interface Props {
  data: UserProfile;
}

const ProfileClient = ({ data }: Props) => {
  const [user, setUser] = useState<UserProfile | null>(data);
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
    form.reset({
      fullName: data.fullName || "",
      email: data.email || "",
      address: data.address || "",
      phone: data.phone || "",
      password: "",
      confirmPassword: "",
    });
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
