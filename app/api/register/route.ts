import { VerifyUserTemplate } from "./../../../components/email/verify-user";
import { sendEmail } from "@/lib/sendEmail";
import { prisma } from "@/prisma/prisma-client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, password } = body;

    if (!fullName || !email || !password) {
      return NextResponse.json(
        { message: "Все поля обязательны для заполнения" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Пользователь с таким email уже существует" },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
      },
    });

    const verify_code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        userId: newUser.id,
        code: verify_code,
      },
    });

    await sendEmail(
      newUser.email,
      "Подтверждение регистрации",
      VerifyUserTemplate({ code: verify_code, userId: String(newUser.id) })
    );

    return NextResponse.json(
      {
        message: "Пользователь успешно зарегистрирован",
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Ошибка при регистрации пользователя:", error);
    return NextResponse.json(
      { message: "Ошибка при регистрации пользователя" },
      { status: 500 }
    );
  }
}
