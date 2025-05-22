import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = (await req.nextUrl.searchParams.get("query")) || "";
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: query, // пишем так буд то функция includes in js, а если просто where: query то это озночало бы строгое сравнение
        mode: "insensitive", // чувствительность к регистру
      },
    },
  });
  return NextResponse.json(products);
}
