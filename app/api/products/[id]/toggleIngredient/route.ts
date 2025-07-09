import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const productId = Number(params.id);
    const { ingredientId } = await req.json();

    if (!ingredientId) {
      return NextResponse.json(
        { message: "Не указан ингредиент" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { ingredients: true },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Продукт не найден" },
        { status: 404 }
      );
    }

    const isAlreadyLinked = product.ingredients.some(
      (ing) => ing.id === ingredientId
    );

    if (isAlreadyLinked) {
      await prisma.product.update({
        where: { id: productId },
        data: {
          ingredients: {
            disconnect: { id: ingredientId },
          },
        },
      });

      return NextResponse.json({ status: "removed" });
    } else {
      await prisma.product.update({
        where: { id: productId },
        data: {
          ingredients: {
            connect: { id: ingredientId },
          },
        },
      });

      return NextResponse.json({ status: "added" });
    }
  } catch (error) {
    console.error("Ошибка toggleIngredient:", error);
    return NextResponse.json({ message: "Ошибка сервера" }, { status: 500 });
  }
}
