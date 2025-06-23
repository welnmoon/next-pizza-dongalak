import { prisma } from "@/prisma/prisma-client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { fullName, email, password } = body;

  const findUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (findUser) {
    return NextResponse.json(
      { message: "Пользователь с таким email уже существует" },
      { status: 409 }
    );
  }

  const hashedPassword = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
    },
  });
  return NextResponse.json(
    { id: user.id, email: user.email, fullName: user.fullName },
    {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
