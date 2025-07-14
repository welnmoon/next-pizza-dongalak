import { PrintUserOrderItems } from "@/utils/admin/users/print-user-order-items";
import { formatDate } from "@/utils/formatDate";
import { Order } from "@prisma/client";

function formatAmount(amount: number) {
  return amount.toLocaleString("ru-RU", { style: "currency", currency: "RUB" });
}

function getStatusText(status: string) {
  switch (status) {
    case "PENDING":
      return "Ожидает оплаты";
    case "SUCCEEDED":
      return "Оплачен";
    case "CANCELLED":
      return "Отменён";
    default:
      return status;
  }
}

const ProfileOrders = ({ orders }: { orders: Order[] }) => {
  if (!orders || orders.length === 0) {
    return <div>У вас пока нет заказов.</div>;
  }

  return (
    <div className="w-1/2 mt-15">
      <h1 className="text-[32px] font-bold mb-5">Ваши заказы</h1>
      <PrintUserOrderItems orders={orders} />
    </div>
  );
};

export default ProfileOrders;
