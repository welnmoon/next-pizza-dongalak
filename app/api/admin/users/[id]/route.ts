import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/prisma/prisma-client";
import { hash } from "bcrypt";
import { UserRole } from "@prisma/client";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ message: "Доступ запрещён" }, { status: 403 });
  }

  const userId = Number(params.id);
  if (isNaN(userId)) {
    return NextResponse.json({ message: "Неверный ID" }, { status: 400 });
  }

  const body = await req.json();
  const { fullName, phone, address, password, role } = body;

  const data = {
    fullName: "",
    phone: null,
    address: null,
    role: UserRole.USER as UserRole, // Default role
    password: "",
  };
  if (fullName) data.fullName = fullName;
  if (phone) data.phone = phone;
  if (address) data.address = address;
  if (role && ["USER", "ADMIN"].includes(role)) data.role = role as UserRole;
  if (password) {
    data.password = await hash(password, 10);
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });

    return NextResponse.json(updatedUser);
  } catch (e) {
    return NextResponse.json(
      { message: `Ошибка обновления ${e}` },
      { status: 500 }
    );
  }
}
