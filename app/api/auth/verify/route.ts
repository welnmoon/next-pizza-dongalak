import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const userId = Number(url.searchParams.get("userId"));

  if (!code || !userId || isNaN(userId)) {
    return new Response(
      "Код подтверждения или ID пользователя не предоставлены",
      {
        status: 400,
      }
    );
  }

  const findCodeWithUser = await prisma.verificationCode.findFirst({
    where: {
      code,
      userId,
    },
  });

  if (!findCodeWithUser) {
    return NextResponse.json(
      {
        message:
          "Код подтверждения не найден или не соответствует пользователю",
      },
      { status: 404 }
    );
  }

  const findUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!findUser) {
    return NextResponse.json(
      { message: "Пользователь не найден" },
      { status: 404 }
    );
  }

  await prisma.user.update({
    where: { id: userId },
    data: { verified: new Date() },
  });

  await prisma.verificationCode.delete({
    where: { id: findCodeWithUser.id },
  });

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verified`
  );
}
