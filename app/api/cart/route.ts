// app/api/cart/route.ts
import { prisma } from "@/prisma/prisma-client";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // 1. Получаем userId, если пользователь авторизован
  const session = await getServerSession();
  const userId = Number(session?.user?.id);

  let cart;
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
  } else {
    const token = req.cookies.get("cartToken")?.value;
    if (!token) return NextResponse.json({});
    cart = await prisma.cart.findFirst({
      where: { token },
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
  }
  return NextResponse.json(cart);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productItemId, quantity = 1, ingredientsIds = [] } = body;

  // 1. Получаем userId, если пользователь авторизован
  const session = await getServerSession();
  const userId = session?.user?.id;

  let token = req.cookies.get("cartToken")?.value;
  let setCookie = false;
  if (!token) {
    token = `guest-${randomUUID()}`;
    setCookie = true;
  }
  let cart = await prisma.cart.findFirst({ where: { token } });

  if (!cart) {
    cart = await prisma.cart.create({ data: { token } });
  }

  if (!productItemId) {
    const response = NextResponse.json({ cart });
    if (setCookie) {
      response.cookies.set("cartToken", token, { path: "/" });
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
    response.cookies.set("cartToken", token, { path: "/" });
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
