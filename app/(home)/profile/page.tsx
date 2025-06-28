"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Container from "@/components/Container";
import ProfileClient from "@/components/Profile/Profile";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user.email) {
    return redirect("/auth/not-authenticated");
  }

  return (
    <Container>
      <ProfileClient />
    </Container>
  );
};

export default ProfilePage;
