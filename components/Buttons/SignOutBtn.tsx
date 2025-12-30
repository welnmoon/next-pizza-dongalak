"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const SignOutButton = () => {
  return (
    <Button
      className="mt-4 bg-emerald-700 hover:bg-emerald-800"
      onClick={() => signOut({ callbackUrl: "/auth" })}
    >
      Выйти
    </Button>
  );
};

export default SignOutButton;
