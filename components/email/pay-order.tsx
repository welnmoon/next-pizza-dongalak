import React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  paymentUrl: string;
  items: string;
}

export const PayOrderEmailTemplate = ({
  orderId,
  totalAmount,
  paymentUrl,
  items,
}: Props) => {
  const parsedItems: string[] = JSON.parse(items);

  return (
    <div>
      <h1>Заказ #{orderId}</h1>

      <p>
        Оплатите заказ на сумму <b>{totalAmount} ₸</b>. Перейдите{" "}
        <a href={paymentUrl}>по этой ссылке</a> для оплаты заказа.
      </p>

      <ul>
        {parsedItems.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
};
