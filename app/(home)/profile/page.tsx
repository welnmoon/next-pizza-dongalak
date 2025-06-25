"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOutButton from "@/components/Buttons/SignOutBtn";
import Container from "@/components/Container";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/auth/not-authenticated");
  }

  return (
    <Container>
      <div className="mt-6 mb-6 w-full">
        <h1 className="text-xl font-bold">Hi, {session?.user.email}</h1>
        <p>Welcome to your profile page!</p>

        <div className="mt-4">
          <p>
            Your full name:{" "}
            {session?.user.name ? session.user.name : `User ${session.user.id}`}
          </p>
          <p>Your role: {session?.user.role}</p>
          <p>Your email: {session?.user.email}</p>
        </div>

        <SignOutButton />
      </div>
    </Container>
  );
};

export default ProfilePage;
