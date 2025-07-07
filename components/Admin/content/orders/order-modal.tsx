"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";

import { formatDate } from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import { OrderWithUser } from "@/types/admin/Order";
import { JsonValue } from "@prisma/client/runtime/library";
import { PrintOrders } from "@/utils/admin/orders/print-order-items";
import OrderInfoTable from "./order-info-table";

interface Props {
  openModal: boolean;
  selectedOrder: OrderWithUser;
  setOpenModal: (openModal: boolean) => void;
}
const OrderModal = ({ openModal, selectedOrder, setOpenModal }: Props) => {
  const session = useSession();
  const [loading, setLoading] = useState(false);

  if (!selectedOrder) {
    return null;
  }


  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="w-[90%] h-[90%] mx-auto overflow-y-scroll px-10">
        <DialogHeader>
          <DialogTitle className="sticky top-0 bg-white p-2 shadow  rounded-md z-10">
            Подробнее о заказе №{selectedOrder.id}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Создан: {formatDate(selectedOrder?.createdAt ?? new Date())}
          </p>

          <OrderInfoTable selectedOrder={selectedOrder} />

          {/*Orders*/}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-medium">Заказы:</h2>
            <PrintOrders selectedOrder={selectedOrder} />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OrderModal;
