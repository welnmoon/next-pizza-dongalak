"use server";

import { PaidEmailTemplate } from "@/components/email/paid";
import { PayOrderEmailTemplate } from "@/components/email/pay-order";

import { sendEmail } from "@/lib/sendEmail";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/prisma/prisma-client";

interface checkoutActionPaymentType {
  unit_amount: number;
  name: string;
  orderId: number;
}

export async function checkoutActionPayment({
  name,
  unit_amount,
  orderId,
}: checkoutActionPaymentType) {
  try {
    console.log("[checkout-action]", name);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "kzt",
            product_data: {
              name: `${unit_amount + " " + name}`,
            },
            unit_amount: unit_amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/home/?paid",
      cancel_url: "http://localhost:3000/home/?notpaid",

      metadata: {
        orderId: orderId.toString(),
      },
    });

    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    const orderItems =
      typeof order?.items === "string" ? JSON.parse(order.items) : order?.items;
    const itemNames = (orderItems as any[]).map(
      (i) =>
        `${i.productItem.product.name} x ${i.quantity} = ${
          i.productItem.price * i.quantity
        }`
    );

    await sendEmail(
      order?.email!,
      `Next Pizza / Счёт на оплату заказа #${orderId}`,
      PayOrderEmailTemplate({
        orderId,
        totalAmount: order?.totalAmount!,
        items: JSON.stringify(itemNames),
        paymentUrl: session.url!,
      })
      // PaidEmailTemplate({
      //   items: JSON.stringify(order?.items),
      //   orderId,
      //   totalAmount: unit_amount,
      // })
    );

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentId: session.id,
      },
    });

    return session;
  } catch (error: any) {
    console.error("Ошибка создания сессии Stripe:", error);
    throw new Error("Ошибка при создании платежной сессии: " + error.message);
  }
}
