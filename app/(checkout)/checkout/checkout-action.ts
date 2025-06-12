import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function checkoutActionPayment() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "kzt",
            product_data: {
              name: "Тестовый товар",
            },
            unit_amount: 5000,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/checkout/success",
      cancel_url: "http://localhost:3000/checkout/cancel",
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Ошибка создания сессии Stripe:", error);
    return NextResponse.json(
      { error: "Ошибка при создании платежной сессии", details: error.message },
      { status: 500 }
    );
  }
}
