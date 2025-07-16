"use client";
import { formatDate } from "@/utils/formatDate";
import { Order } from "@prisma/client";

type OrderItem = {
  productItem: {
    product: {
      name: string;
      imageUrl: string;
      size: number;
    };
    price: number;
    size: number;
  };
  quantity: number;
};
import { useTransition } from "react";

const ProfileOrders = ({ orders }: { orders: Order[] }) => {
  const [pending, startTransition] = useTransition();
  if (!orders || orders.length === 0) {
    return <div>У вас пока нет заказов.</div>;
  }

  const handlePay = (id: number) => {
    startTransition(async () => {
      const response = await fetch(`/api/orders/pay/${id}`, {
        method: "POST",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.url) window.location.href = data.url;
      }
    });
  };

  return (
    <div className="w-1/2 mt-15 ">
      <h1 className="text-[32px] font-bold mb-5">Ваши заказы</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className="border rounded p-4 mb-4 shadow flex flex-col gap-2"
        >
          {Array.isArray(order.items) &&
          (order.items as OrderItem[]).length > 0 ? (
            (order.items as OrderItem[]).map((item: OrderItem, i: number) => (
              <div key={i} className="flex gap-4 items-center">
                <img
                  src={item.productItem.product.imageUrl}
                  alt={item.productItem.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold">
                    {item.productItem.product.name}
                  </p>
                  <p>Размер: {item.productItem.size} см</p>
                  <p>Количество: {item.quantity}</p>
                  <p>Цена за штуку: {item.productItem.price} ₸</p>
                  <p className="font-medium text-orange-600">
                    Общая цена: {item.quantity * item.productItem.price} ₸
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Нет данных о заказе</p>
          )}
          <div className="p-4 bg-gray-100 rounded-md flex justify-between items-center">
            <div>
              <p>
                Статус:{" "}
                {order.status === "SUCCEEDED"
                  ? "✅ Оплачен"
                  : order.status === "PENDING"
                    ? "🕒 В ожидании"
                    : "❌ Отменён"}
              </p>
              <p>Дата создания: {formatDate(order.createdAt)}</p>
            </div>
            {order.status === "PENDING" && (
              <button
                onClick={() => handlePay(order.id)}
                disabled={pending}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
              >
                Оплатить
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileOrders;
