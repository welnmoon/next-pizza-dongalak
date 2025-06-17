import React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  items: string;
}

export const PaidEmailTemplate = ({ orderId, totalAmount, items }: Props) => {
  const parsedItems: string[] = JSON.parse(items);

  return (
    <div>
      <h1>Успешная оплата заказа #{orderId}</h1>

      <p>
        Вы успешно оплатили ваш заказ на сумму <b>{totalAmount} ₸</b>.
      </p>

      <ul>
        {parsedItems.map((i) => (
          <li>{i}</li>
        ))}
      </ul>
    </div>
  );
};
