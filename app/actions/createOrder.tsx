"use server";

import { ChekoutSchema } from "@/components/Checkout/chekoutSchema";
import { sendEmail } from "@/lib/sendEmail";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";

import { render } from "@react-email/render";

export async function createOrder(data: ChekoutSchema) {
  try {
    const cookiesStore = cookies();
    const cartToken = (await cookiesStore).get("cartToken")?.value;
    if (!cartToken) {
      throw new Error("Cart token not found");
    }

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
    // создали заказ
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.lastName + " " + data.name,
        email: data.email,
        phone: data.number,
        address: data.adress,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items),
        userId: userCart?.user?.id,
      },
    });
    let url = "";
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log("Ответ от сервера:", data);
      if (data.url) {
        url = data.url as string;
      } else {
        console.error("URL не найден в ответе");
      }
    } catch (error) {
      console.error("Произошла ошибка:", error);
    }

    await sendEmail(
      data.email,
      "Next Pizza / Оплатите заказ #" + order.id,
      order.id,
      total,
      url
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

    return url;
  } catch (err) {
    console.error("Ошибка при создании заказа:", err);
    throw err;
  }
}
