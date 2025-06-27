// /app/api/user/profile/route.ts
import { getServerSession } from "next-auth";

import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(session.user.id) },
    select: {
      fullName: true,
      email: true,
      phone: true,
      adress: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Пользователь не найден" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}
