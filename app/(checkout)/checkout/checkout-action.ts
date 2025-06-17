"use server";

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
    console.log("[checkout-action] console.log(name)", name);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "kzt",
            product_data: {
              name: `${unit_amount + " " + name}`, // TODO - выводится сумма  = 0
            },
            unit_amount: unit_amount * 100,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/home/?paid",
      cancel_url: "http://localhost:3000/checkout/cancel",
    });

    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentId: session.payment_intent as string,
      },
    });

   

    return { url: session.url };
  } catch (error: any) {
    console.error("Ошибка создания сессии Stripe:", error);
    throw new Error("Ошибка при создании платежной сессии: " + error.message);
  }
}
