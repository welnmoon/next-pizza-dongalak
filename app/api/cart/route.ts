// app/api/cart/route.ts
import { prisma } from "@/prisma/prisma-client";
import { Cart } from "@prisma/client";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // 1. Получаем userId, если пользователь авторизован
  const session = await getServerSession();
  const userId = Number(session?.user?.id);

  let cart;
  let token = req.cookies.get("cartToken")?.value;
  let setCookie = false;
  if (!token) {
    token = `guest-${randomUUID()}`;
    setCookie = true;
  }
  if (userId) {
    cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });
    // Если корзины нет, но е��ть cartToken — привязать гостевую корзину к пользователю
    if (!cart && token) {
      const guestCart = await prisma.cart.findFirst({ where: { token } });
      if (guestCart) {
        cart = await prisma.cart.update({
          where: { id: guestCart.id },
          data: { userId },
          include: {
            items: {
              orderBy: { createdAt: "desc" },
              include: {
                productItem: { include: { product: true } },
                ingredients: true,
              },
            },
          },
        });
      }
    }
  } else {
    if (!token) setCookie = true;
    cart = await prisma.cart.findFirst({
      where: { token },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: { include: { product: true } },
            ingredients: true,
          },
        },
      },
    });
    if (!cart) {
      cart = await prisma.cart.create({ data: { token } });
      setCookie = true;
    }
  }
  const response = NextResponse.json(cart ?? { items: [] });
  if (setCookie) {
    const oneYear = 60 * 60 * 24 * 365;
    response.cookies.set("cartToken", token, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: oneYear,
      expires: new Date(Date.now() + oneYear * 1000),
    });
  }
  return response;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productItemId, quantity = 1, ingredientsIds = [] } = body;

  const session = await getServerSession();
  const userId = Number(session?.user?.id);

  let token = req.cookies.get("cartToken")?.value;
  let setCookie = false;
  if (!token) {
    token = `guest-${randomUUID()}`;
    setCookie = true;
  }

  let cart: Cart | null = null;

  if (userId) {
    // Сначала ищем корзину по userId
    cart = await prisma.cart.findFirst({ where: { userId } });
    // Если нет — ищем по cartToken и привязываем к userId
    if (!cart && token) {
      const guestCart = await prisma.cart.findFirst({ where: { token } });
      if (guestCart) {
        cart = await prisma.cart.update({
          where: { id: guestCart.id },
          data: { userId },
        });
      }
    }
    // Если всё равно нет — создаём новую корзину с userId
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId, token } });
      setCookie = true;
    }
  } else {
    // Гость
    cart = await prisma.cart.findFirst({ where: { token } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { token } });
      setCookie = true;
    }
  }

  if (!productItemId) {
    const response = NextResponse.json({ cart });
    if (setCookie) {
      const oneYear = 60 * 60 * 24 * 365;
      response.cookies.set("cartToken", token, {
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: oneYear,
        expires: new Date(Date.now() + oneYear * 1000),
      });
    }
    return response;
  }

  const candidateItems = await prisma.cartItem.findMany({
    where: {
      cartId: cart.id,
      productItemId,
    },
    include: {
      ingredients: true,
    },
  });

  const arraysEqual = (a: number[], b: number[]) => {
    if (a.length !== b.length) return false;
    return a.sort().every((val, i) => val === b.sort()[i]);
  };

  const matchingItem = candidateItems.find((item) => {
    const existingIds = item.ingredients.map((i) => i.id);
    return arraysEqual(existingIds, ingredientsIds);
  });

  if (matchingItem) {
    await prisma.cartItem.update({
      where: { id: matchingItem.id },
      data: { quantity: matchingItem.quantity + quantity },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productItemId,
        quantity,
        ingredients: {
          connect: ingredientsIds.map((id: number) => ({ id })),
        },
      },
    });
  }

  const response = NextResponse.json({ success: true });
  if (setCookie) {
    const oneYear = 60 * 60 * 24 * 365;
    response.cookies.set("cartToken", token, {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: oneYear,
      expires: new Date(Date.now() + oneYear * 1000),
    });
  }
  return response;
}

export async function PATCH(req: NextRequest) {
  const { cartItemId, quantity } = await req.json();

  if (
    typeof cartItemId !== "number" ||
    typeof quantity !== "number" ||
    quantity < 1
  ) {
    return NextResponse.json(
      { error: "Неверные данные: cartItemId и quantity обязательны." },
      { status: 400 }
    );
  }

  const updated = await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();

  if (!id) {
    return NextResponse.json(
      { error: "Cart item is not exists" },
      { status: 400 }
    );
  }

  const deleted = await prisma.cartItem.delete({
    where: {
      id: id,
    },
  });
  return NextResponse.json(deleted);
}
