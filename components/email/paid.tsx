import React from "react";

interface Props {
  orderId: number;
  totalAmount: number;
  items: string;
}

export const PaidEmailTemplate = ({ orderId, totalAmount, items }: Props) => {
  let parsedItems: string[] = JSON.parse(items);

  if(!parsedItems) {
    parsedItems = ['Нету продуктов, или ошибка при получении продуктов']
  }

  return (
    <div>
      <h1>Успешная оплата заказа #{orderId}</h1>

      <p>
        Вы успешно оплатили ваш заказ на сумму <b>{totalAmount} ₸</b>.
      </p>

      <ul>
        {parsedItems.map((i, index) => (
          <li key={index}>{i}</li>
        ))}
      </ul>
    </div>
  );
};
