import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    const data = await req.json();
    const { itemId } = params;

    // Проверка на дубликат (кроме текущего варианта)
    const duplicate = await prisma.productItem.findFirst({
      where: {
        id: { not: Number(itemId) },
        productId: data.productId, // Передавай productId с клиента!
        size: data.size,
        pizzaType: data.pizzaType,
      },
    });

    if (duplicate) {
      return NextResponse.json(
        { message: "Вариант с таким размером и типом теста уже существует" },
        { status: 409 }
      );
    }

    const updatedItem = await prisma.productItem.update({
      where: { id: Number(itemId) },
      data: {
        price: data.price !== undefined ? Number(data.price) : undefined,
        size: data.size !== undefined ? Number(data.size) : undefined,
        pizzaType:
          data.pizzaType !== undefined ? Number(data.pizzaType) : undefined,
      },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Ошибка при обновлении вариации, ${error}` },
      { status: 500 }
    );
  }
}
