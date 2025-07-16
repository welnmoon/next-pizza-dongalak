import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;
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
    include: {
      products: {
        include: {
          items: true,
          ingredients: true,
        },
      },
    },
  });

  return NextResponse.json(updatedCategory);
}

export async function DELETE({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ message: "Не авторизован" }, { status: 401 });
  }

  const isAdmin = session.user.role === "ADMIN";

  if (!isAdmin) {
    return NextResponse.json({ message: "Нет доступа" }, { status: 403 });
  }

  const deletedCategory = await prisma.category.delete({
    where: {
      id: Number(params.id),
    },
  });

  const isExist = await prisma.category.findFirst({
    where: {
      id: deletedCategory.id,
    },
  });

  if (isExist) {
    return NextResponse.json(
      { message: "Категория не удалена" },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Категория удалена" }, { status: 200 });
}
