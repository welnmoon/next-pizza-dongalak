import { prisma } from "@/prisma/prisma-client";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const userId = Number(url.searchParams.get("userId"));

  if (!code || !userId || isNaN(userId)) {
    return new Response(
      "Код подтверждения или ID пользователя не предоставлены",
      {
        status: 400,
      }
    );
  }

  const findCodeWithUser = await prisma.verificationCode.findFirst({
    where: {
      code,
      userId,
    },
  });

  if (!findCodeWithUser) {
    return NextResponse.json(
      {
        message:
          "Код подтверждения не найден или не соответствует пользователю",
      },
      { status: 404 }
    );
  }

  const findUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    return NextResponse.json(
      { message: "Пользователь не найден" },
      { status: 404 }
    );
  }

  const cookiesStore = cookies();
  let token = (await cookiesStore).get("cartToken")?.value;
  if (!token) {
    token = `guest-${randomUUID()}`;
    (await cookiesStore).set("cartToken", token, { path: "/" });
  }
  // Проверяем, есть ли уже корзина у пользователя
  const userCart = await prisma.cart.findFirst({ where: { userId } });
  const guestCart = await prisma.cart.findFirst({ where: { token } });
  if (guestCart && !userCart) {
    // Привязать гостевую корзину к пользователю
    await prisma.cart.update({
      where: { id: guestCart.id },
      data: { userId },
    });
    await prisma.user.update({
      where: { id: userId },
      data: {
        verified: new Date(),
        cart: {
          connect: { id: guestCart.id },
        },
      },
    });
  } else if (!guestCart && !userCart) {
    // Нет ни гостевой, ни пользовательской корзины — создать новую
    await prisma.user.update({
      where: { id: userId },
      data: {
        verified: new Date(),
        cart: {
          create: {
            token,
            totalAmount: 0,
          },
        },
      },
    });
  } else {
    // Уже есть корзина у пользователя — просто обновить verified
    await prisma.user.update({
      where: { id: userId },
      data: {
        verified: new Date(),
      },
    });
  }

  await prisma.verificationCode.delete({
    where: { id: findCodeWithUser.id },
  });

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/verified`
  );
}
