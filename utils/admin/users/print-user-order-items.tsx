import { formatDate } from "@/utils/formatDate";
import { Order } from "@prisma/client";
import { ReactNode } from "react";

interface Props {
  orders: Order[];
}

export function PrintUserOrderItems({ orders }: Props): ReactNode {
  if (Array.isArray(orders) && orders.length > 0) {
    return (
      <>
        {orders.map((order) =>
          Array.isArray(order.items) && order.items.length > 0 ? (
            order.items.map((item: any, i: number) => (
              <div
                key={i}
                className="border rounded p-4 mb-4 shadow flex flex-col gap-2 "
              >
                <div className="flex gap-4 items-center">
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
                <div className="p-4 bg-gray-100 rounded-md">
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
              </div>
            ))
          ) : (
            <p>Нет данных о заказе</p>
          )
        )}
      </>
    );
  } else {
    return <p>Нет данных о заказанных товарах</p>;
  }
}
