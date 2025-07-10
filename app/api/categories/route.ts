import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const categories = await prisma.category.findMany();
  return NextResponse.json(categories);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newCategory = await prisma.category.create({
    data: {
      name: data.name,
    },
  });

  return NextResponse.json(newCategory);
}
