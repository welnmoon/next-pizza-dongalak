"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@prisma/client";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userSchema, UserSchemaType } from "./userSchema";
import UserForm from "./user-form";
import { formatDate } from "@/utils/formatDate";
import { useSession } from "next-auth/react";

interface Props {
  openModal: boolean;
  selectedUser: User;
  setOpenModal: (openModal: boolean) => void;
}
const UserModal = ({ openModal, selectedUser, setOpenModal }: Props) => {
  const [user, setUser] = useState(
    selectedUser
      ? {
          ...selectedUser,
          phone: selectedUser.phone ?? undefined,
          address: selectedUser.address ?? undefined,
        }
      : null
  );
  const [loading, setLoading] = useState(false);

  const session = useSession();

  const form = useForm({
    resolver: zodResolver(userSchema),
    mode: "onChange",
    defaultValues: {
      fullName: selectedUser.fullName,
      email: selectedUser.email,
      phone: selectedUser.phone || "",
      address: selectedUser.address || "",
      role: selectedUser.role,
      password: "",
      confirmPassword: "",
    },
  });

  const watched = form.watch();

  const isChanged =
    watched.fullName !== user?.fullName ||
    watched.email !== user?.email ||
    watched.phone !== user?.phone ||
    watched.address !== user?.address ||
    watched.password !== "" ||
    watched.confirmPassword !== "";

  const onSubmit = async (data: UserSchemaType) => {
    setLoading(true);
    const res = await fetch(`/api/admin/users/${user?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        phone: data.phone,
        address: data.address,
        password: data.password,
        role: data.role,
        email: data?.email,
      }),
    });

    if (res.ok) {
      const updated = await res.json();

      if (updated.id === session?.data?.user.id && updated.role !== "ADMIN") {
        toast("Вы были понижены. Перенаправление...");
        window.location.href = "/";
        return;
      }

      setUser(updated);
      form.reset({
        fullName: updated.fullName || "",
        email: updated.email || "",
        address: updated.address || "",
        phone: updated.phone || "",
        role: updated.role,
        password: "",
        confirmPassword: "",
      });
    }
    setLoading(false);
    toast.success("Профиль успешно обновлен!");
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="w-1/2 mx-auto">
        <DialogHeader>
          <DialogTitle>Подробнее о пользователе</DialogTitle>
          <DialogDescription>{selectedUser.fullName}</DialogDescription>
          <p>Создан: {formatDate(selectedUser.createdAt)}</p>
          <p>Обновлён: {formatDate(selectedUser.updatedAt)}</p>
          <p>Верифицирован: {formatDate(selectedUser.verified)}</p>

          <FormProvider {...form}>
            <UserForm
              onSubmit={onSubmit}
              loading={loading}
              isChanged={isChanged}
            />
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
