import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
  }

  const requestedId = Number(params.userId);
  const currentId = Number(session.user.id);
  const isAdmin = session.user.role === "ADMIN";

  if (!isAdmin && currentId !== requestedId) {
    return NextResponse.json({ message: "Нет доступа" }, { status: 403 });
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: requestedId,
    },
  });

  return NextResponse.json(orders);
}
