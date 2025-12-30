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
    return (
      <div className="mt-10 rounded-2xl border border-stone-200 bg-[#FFFCF7] p-6 shadow-sm max-w-4xl">
        <h2 className="text-[28px] font-bold mb-2">Заказы</h2>
        <p className="text-stone-600">У вас пока нет заказов.</p>
      </div>
    );
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
    <div className="mt-10 max-w-4xl space-y-4">
      <h1 className="text-[28px] font-bold">Ваши заказы</h1>
      {orders.map((order) => (
        <div
          key={order.id}
          className="border border-stone-200 rounded-2xl p-4 shadow-sm flex flex-col gap-2 bg-[#FFFCF7]"
        >
          {Array.isArray(order.items) &&
          (order.items as OrderItem[]).length > 0 ? (
            (order.items as OrderItem[]).map((item: OrderItem, i: number) => (
              <div key={i} className="flex gap-4 items-center">
                <img
                  src={item.productItem.product.imageUrl}
                  alt={item.productItem.product.name}
                  className="w-16 h-16 object-cover rounded-xl bg-stone-50"
                />
                <div>
                  <p className="font-semibold">
                    {item.productItem.product.name}
                  </p>
                  <p>Размер: {item.productItem.size} см</p>
                  <p>Количество: {item.quantity}</p>
                  <p>Цена за штуку: {item.productItem.price} ₸</p>
                  <p className="font-medium text-emerald-700">
                    Общая цена: {item.quantity * item.productItem.price} ₸
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>Нет данных о заказе</p>
          )}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
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
                className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl transition"
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
