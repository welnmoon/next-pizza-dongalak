"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const SignOutButton = () => {
  return (
    <Button
      className="mt-4 bg-orange-500"
      onClick={() => signOut({ callbackUrl: "/auth" })}
    >
      Выйти
    </Button>
  );
};

export default SignOutButton;
