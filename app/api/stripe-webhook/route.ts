// /app/api/webhook/route.ts
import { stripe } from "@/lib/stripe";
import { sendEmail } from "@/lib/sendEmail";
import { PaidEmailTemplate } from "@/components/email/paid";
import { NextRequest, NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import { prisma } from "@/prisma/prisma-client";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature")!;
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const order = await prisma.order.findFirst({
      where: { paymentId: session.payment_intent },
    });

    if (order) {
      await sendEmail(
        order.email,
        `Next Pizza / Спасибо за оплату заказа #${order.id}`,
        PaidEmailTemplate({
          orderId: order.id,
          items: String(order.items),
          totalAmount: order.totalAmount,
        })
      );

      await prisma.order.update({
        where: { id: order.id },
        data: { status: OrderStatus.SUCCEEDED },
      });
    }
  }

  return NextResponse.json({ received: true });
}
