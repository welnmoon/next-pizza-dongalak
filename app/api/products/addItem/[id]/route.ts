import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const { id } = params;
  const { price, size, pizzaType } = data;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
  });

  if (!product) {
    return NextResponse.json({ message: "Продукт не найден" }, { status: 404 });
  }

  const isItemExist = await prisma.productItem.findFirst({
    where: {
      productId: Number(id),
      price,
      size,
      pizzaType,
    },
  });

  const result = isItemExist
    ? await prisma.productItem.update({
        data: {
          price,
          size,
          pizzaType,
          productId: Number(id),
        },
        where: {
          id: isItemExist.id,
        },
      })
    : await prisma.productItem.create({
        data: {
          price,
          size,
          pizzaType,
          productId: Number(id),
        },
      });

  return NextResponse.json(result, { status: isItemExist ? 200 : 201 });
}
