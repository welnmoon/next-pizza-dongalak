"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { Order, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { userSchema, UserSchemaType } from "./userSchema";
import UserForm from "./user-form";
import { formatDate } from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import { PrintUserOrderItems } from "@/utils/admin/users/print-user-order-items";

interface Props {
  openModal: boolean;
  selectedUser: User;
  setOpenModal: (openModal: boolean) => void;
  updateUser: (user: User) => void;
}
const UserModal = ({
  openModal,
  selectedUser,
  setOpenModal,
  updateUser,
}: Props) => {
  const [user, setUser] = useState(
    selectedUser
      ? {
          ...selectedUser,
          phone: selectedUser.phone ?? undefined,
          address: selectedUser.address ?? undefined,
        }
      : null
  );
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.id) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/orders/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const orders: Order[] = await res.json();
        setOrders(orders);
        setLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке заказов", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

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
      updateUser(updated);

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
      <DialogContent className="w-[80%] mx-auto">
        <DialogHeader className="grid grid-cols-2 gap-6 max-h-[80vh] overflow-hidden">
          {/* Левая часть — профиль */}
          <div className="overflow-y-auto pr-2">
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
          </div>

          {/* Правая часть — заказы */}
          <div className="overflow-y-auto pr-2 border-l pl-4">
            <h2 className="text-xl font-semibold mb-2">Заказы</h2>
            {loading ? (
              <p>Загрузка...</p>
            ) : orders.length > 0 ? (
              <div className="space-y-3">{PrintUserOrderItems({ orders })}</div>
            ) : (
              <p className="text-muted-foreground">Нет заказов</p>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default UserModal;
