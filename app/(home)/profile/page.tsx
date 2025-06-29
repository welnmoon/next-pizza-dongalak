"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Container from "@/components/Container";
import ProfileClient, { UserProfile } from "@/components/Profile/Profile";
import { prisma } from "@/prisma/prisma-client";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user.email) {
    return redirect("/auth/not-authenticated");
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
    redirect("/auth/not-authenticated");
  }

  const userData = {
    ...user,
    phone: user.phone ?? undefined,
    address: user.address ?? undefined,
  };

  return (
    <Container>
      <ProfileClient data={userData} />
      {/*TODO - Orders*/}
    </Container>
  );
};

export default ProfilePage;
