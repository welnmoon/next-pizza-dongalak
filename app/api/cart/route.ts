// app/api/cart/route.ts
import { prisma } from "@/prisma/prisma-client";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("cartToken")?.value;
  if (!token) {
    return NextResponse.json({});
  }
  const cart = await prisma.cart.findFirst({
    where: {
      token,
    },
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

  return NextResponse.json(cart);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { productItemId, quantity = 1, ingredientsIds = [] } = body;

  const cookiesStore = cookies();
  let token = (await cookiesStore).get("cartToken")?.value!;

  let cart = await prisma.cart.findFirst({ where: { token } });

  if (!cart) {
    cart = await prisma.cart.create({ data: { token } });
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

  return NextResponse.json({ success: true });
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
