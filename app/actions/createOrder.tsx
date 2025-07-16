"use server";

import { ChekoutSchema } from "@/components/Checkout/chekoutSchema";
import { sendEmail } from "@/lib/sendEmail";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

import { checkoutActionPayment } from "../(checkout)/checkout/checkout-action";
import { PayOrderEmailTemplate } from "@/components/email/pay-order";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { taxCalculate } from "@/lib/taxCalculate";
import { deliveryCost } from "@/constants/constants";

export async function createOrder(data: ChekoutSchema) {
  try {
    const cookiesStore = cookies();
    const cartToken = (await cookiesStore).get("cartToken")?.value;
    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const session = await getServerSession(authOptions);

    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken,
      },
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    const total = userCart.items.reduce((sum, item) => {
      const base = item.productItem.price * item.quantity;
      const toppings = item.ingredients.reduce(
        (acc, ing) => acc + ing.price * item.quantity,
        0
      );
      return sum + base + toppings;
    }, 0);

    /* Если корзина пустая возращаем ошибку */
    if (total === 0) {
      throw new Error("Cart is empty");
    }

    const sessionUserId = Number(session?.user?.id);
    // создали заказ

    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.lastName + " " + data.name,
        email: data.email,
        phone: data.number,
        address: data.address,
        comment: data.comment,
        totalAmount: total,
        status: OrderStatus.PENDING,
        items: userCart.items,
        userId:
          (isNaN(sessionUserId) ? undefined : sessionUserId) ??
          userCart?.user?.id,
      },
    });

    const stripeSession = await checkoutActionPayment({
      orderId: order.id,
      name: userCart.items.map((i) => i.productItem.product.name).toString(),
      unit_amount:
        order.totalAmount + taxCalculate(order.totalAmount) + deliveryCost,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: stripeSession.id },
    });

    const itemNames = userCart.items.map(
      (i) =>
        `${i.productItem.product.name} x ${i.quantity} = ${i.productItem.price * i.quantity}`
    );

    await sendEmail(
      data.email,
      `Next Pizza / Оплатите заказ #${order.id}`,
      <PayOrderEmailTemplate
        orderId={order.id}
        totalAmount={total}
        paymentUrl={stripeSession.url!}
        items={JSON.stringify(itemNames)}
      />
    );

    // теперь может очистить
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });
    // и удалить
    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    return stripeSession.url;
  } catch (err) {
    console.error("Ошибка при создании заказа:", err);
    throw err;
  }
}
