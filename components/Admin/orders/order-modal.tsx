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

import { formatDate } from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import { orderWithUserSchema, OrderWithUserSchemaType } from "./orderSchema";
import { OrderWithUser } from "@/types/admin/Order";

interface Props {
  openModal: boolean;
  selectedOrder: OrderWithUser;
  setOpenModal: (openModal: boolean) => void;
}
const OrderModal = ({ openModal, selectedOrder, setOpenModal }: Props) => {
  const [order, setOrder] = useState(selectedOrder);
  const [loading, setLoading] = useState(false);

  const session = useSession();

  // const form = useForm({
  //   resolver: zodResolver(orderWithUserSchema),
  //   mode: "onChange",
  //   defaultValues: {
  //     address: order?.address || "",
  //     comment: order?.comment || "",
  //     email: order?.email || "",
  //     fullName: order?.fullName || "",
  //     phone: order?.phone || "",
  //     status: order?.status || "",
  //     // id: Number(order?.id) || undefined,
  //     items: order?.items || [],
  //     userId: order?.userId || undefined,
  //     // paymentId: order?.paymentId || undefined,
  //   },
  // });

  // const watched = form.watch();

  // const onSubmit = async (data: OrderWithUserSchemaType) => {
  //   setLoading(true);
  //   const res = await fetch(`/api/admin/orders/${order?.id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({}),
  //   });

  //   if (res.ok) {
  //     const updated = await res.json();

  //     if (updated.id === session?.data?.user.id && updated.role !== "ADMIN") {
  //       toast("Вы были понижены. Перенаправление...");
  //       window.location.href = "/";
  //       return;
  //     }

  //     setUser(updated);
  //     form.reset({
  //       fullName: updated.fullName || "",
  //       email: updated.email || "",
  //       address: updated.address || "",
  //       phone: updated.phone || "",
  //       role: updated.role,
  //       password: "",
  //       confirmPassword: "",
  //     });
  //   }
  //   setLoading(false);
  //   toast.success("Профиль успешно обновлен!");
  // };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="w-1/2 mx-auto">
        <DialogHeader>
          <DialogTitle>Подробнее о пользователе</DialogTitle>
          <DialogDescription></DialogDescription>
          <p>Создан: {formatDate(order?.createdAt ?? new Date())}</p>

          {/* <FormProvider {...form}>
            <UserForm
              onSubmit={onSubmit}
              loading={loading}
              isChanged={isChanged}
            />
          </FormProvider> */}

          <div>
            <p>Имя: {order?.fullName}</p>
            <p>Email: {order?.email}</p>
            <p>Телефон: {order?.phone}</p>
            <p>Заказ: {order?.items?.toString()}</p>
            <p>Адрес: {order?.address}</p>
            <p>Статус: {order?.status}</p>
            <p>Комментарий: {order?.comment}</p>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
