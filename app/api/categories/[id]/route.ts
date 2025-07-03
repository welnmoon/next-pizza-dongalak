import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const { name } = await req.json();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
  }

  const isAdmin = session.user.role === "ADMIN";

  if (!isAdmin) {
    return NextResponse.json({ message: "Нет доступа" }, { status: 403 });
  }

  const updatedCategory = await prisma.category.update({
    where: {
      id: Number(id),
    },
    data: {
      name: name,
    },
  });

  return NextResponse.json(updatedCategory);
}
