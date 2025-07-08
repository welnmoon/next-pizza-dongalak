import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { name, imageUrl, categoryId } = data;

  const isExist = await prisma.product.findFirst({
    where: {
      name,
      categoryId,
    },
  });

  console.log("Проверка на дубликат:", { name, categoryId, imageUrl }, isExist);

  if (isExist)
    return NextResponse.json(
      { message: "Продукт уже существует" },
      { status: 409 } // Conflict
    );

  try {
    const newProduct = await prisma.product.create({
      data: {
        name,
        imageUrl,
        categoryId,
      },
    });

    if (!newProduct) {
      throw Error("Ошибка при создании продукта");
    }

    return NextResponse.json(newProduct);
  } catch (err) {
    console.error("Ошибка создания продукта:", err);

    return NextResponse.json(
      { message: "Ошибка сервера. Попробуйте позже." },
      { status: 500 }
    );
  }
}
