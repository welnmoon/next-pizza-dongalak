"use client";
import { OrderWithUser } from "@/types/admin/Order";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import OrderModal from "./order-modal";

interface Props {
  orders: OrderWithUser[];
}

const Orders = ({ orders }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderWithUser | null>(
    null
  );

  const handleOpenModal = (order: OrderWithUser) => {
    setSelectedOrder(order);
    setOpenModal(true);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Заказы</h2>

      <Table>
        <TableCaption>Список заказов пользователей</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Клиент</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Телефон</TableHead>
            <TableHead>Сумма</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                {order.user?.fullName || "-"}
              </TableCell>
              <TableCell>{order.user?.email || "-"}</TableCell>
              <TableCell>{order.phone}</TableCell>
              <TableCell>
                {order.totalAmount.toLocaleString("ru-RU")} ₸
              </TableCell>
              <TableCell>
                {order.status === "SUCCEEDED"
                  ? "✅ Оплачен"
                  : order.status === "PENDING"
                    ? "🕒 В ожидании"
                    : "❌ Отменён"}
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString("ru-RU")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-center gap-2">
                  <FaPen
                    onClick={() => handleOpenModal(order)}
                    color="gray"
                    className="cursor-pointer"
                  />
                  <MdDelete color="red" className="cursor-pointer" size={17} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <OrderModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedOrder={selectedOrder!}
      />
    </div>
  );
};

export default Orders;
