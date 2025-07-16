// /app/api/user/profile/route.ts
import { getServerSession } from "next-auth";

import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
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
      address: true,
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

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
  }

  const body = await req.json();
  const { fullName, number, address, password } = body;

  const data = {
    fullName: "",
    phone: "",
    address: "",
    password: "",
  };
  if (fullName) data.fullName = fullName;
  if (number) data.phone = number;
  if (address) data.address = address;
  if (password) {
    const hashed = await hash(password, 10);
    data.password = hashed;
  }

  const updatedUser = await prisma.user.update({
    where: { id: Number(session.user.id) },
    data,
    select: {
      fullName: true,
      email: true,
      phone: true,
      address: true,
    },
  });

  return NextResponse.json(updatedUser);
}
