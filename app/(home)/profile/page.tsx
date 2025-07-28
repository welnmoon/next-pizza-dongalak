"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Container from "@/components/Container";
import ProfileOrders from "@/components/Profile/orders";
import ProfileClient from "@/components/Profile/Profile";
import { prisma } from "@/prisma/prisma-client";
import { Order } from "@prisma/client";

import { getServerSession } from "next-auth";

import { cookies } from "next/headers";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);
  let userData: {
    fullName: string;
    email: string;
    phone?: string;
    address?: string;
  } | null = null;
  let orders: Order[] = [];

  if (session?.user?.id) {
    // Авторизованный пользователь
    const user = await prisma.user.findUnique({
      where: { id: Number(session.user.id) },
      select: {
        fullName: true,
        email: true,
        phone: true,
        address: true,
      },
    });
    if (user) {
      userData = {
        ...user,
        phone: user.phone ?? undefined,
        address: user.address ?? undefined,
      };
    }
    orders = await prisma.order.findMany({
      where: {
        userId: Number(session.user.id),
      },
    });
  } else {
    // Гость — ищем заказы по токену корзины
    const cookiesStore = cookies();
    const cartToken = cookiesStore.get("cartToken")?.value;
    if (cartToken) {
      orders = await prisma.order.findMany({
        where: {
          token: cartToken,
        },
      });
    }
  }

  return (
    <Container>
      <ProfileClient data={userData} />
      <ProfileOrders orders={orders} />
    </Container>
  );
};

export default ProfilePage;
