// /app/api/webhook/route.ts
import { stripe } from "@/lib/stripe";
import { sendEmail } from "@/lib/sendEmail";
import { PaidEmailTemplate } from "@/components/email/paid";
import { NextRequest, NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import { prisma } from "@/prisma/prisma-client";

type OrderItem = {
  productItem: {
    product: { name: string };
    price: number;
  };
  quantity: number;
};

export async function POST(req: NextRequest) {
  console.log("[Stripe-webhook] ");
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
    const session = event.data.object;

    const orderId = session.metadata?.orderId;
    if (!orderId) {
      console.log("stripe-webhook Error, orderId not found in metadata");
      return NextResponse.json({ error: "order not found" }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id: Number(orderId) },
    });

    if (!order) {
      console.log("stripe-webhook Error, Order not found");
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    try {
      const orderItems =
        typeof order.items === "string" ? JSON.parse(order.items) : order.items;
      const items = Array.isArray(orderItems)
        ? (orderItems as OrderItem[])
        : [];
      const itemNames = items.map(
        (i) =>
          `${i.productItem.product.name} x ${i.quantity} = ${
            i.productItem.price * i.quantity
          }`
      );

      await sendEmail(
        order.email,
        `Next Pizza / Спасибо за оплату заказа #${order.id}`,
        PaidEmailTemplate({
          orderId: order.id,
          items: JSON.stringify(itemNames),
          totalAmount: order.totalAmount,
        })
      );
    } catch (err) {
      console.error("[stripe-webhook] sendEmail error", err);
    }

    try {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.SUCCEEDED,
          paymentId: session.payment_intent as string,
        },
      });
    } catch (err) {
      console.error("[stripe-webhook] failed to update order", err);
      return NextResponse.json(
        { error: "Order update failed" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}
