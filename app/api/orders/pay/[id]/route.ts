import { checkoutActionPayment } from "@/app/(checkout)/checkout/checkout-action";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
type OrderItem = {
  productItem: {
    product: { name: string };
    price: number;
  };
  quantity: number;
};
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // session
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
  }

  // order

  const orderId = Number(params.id);
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    return NextResponse.json({ message: "Заказ не найден" }, { status: 404 });
  }
  const isAdmin = session.user.role === "ADMIN";
  if (!isAdmin && order?.userId !== Number(session.user.id)) {
    return NextResponse.json({ message: "Нет доступа" }, { status: 403 });
  }

  if (order.status === "SUCCEEDED") {
    return NextResponse.json({ message: "Заказ уже оплачен" }, { status: 400 });
  }

  const orderItems =
    typeof order.items === "string" ? JSON.parse(order.items) : order.items;
  const items = Array.isArray(orderItems) ? (orderItems as OrderItem[]) : [];
  const itemNames = items.map(
    (i) =>
      `${i.productItem.product.name} x ${i.quantity} = ${
        i.productItem.price * i.quantity
      }`
  );

  // stripe
  const stripeSession = await checkoutActionPayment({
    name: itemNames.join(", "),
    orderId,
    unit_amount: order.totalAmount,
  });

  await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      paymentId: stripeSession.id,
    },
  });

  return NextResponse.json({ url: stripeSession.url });
}
