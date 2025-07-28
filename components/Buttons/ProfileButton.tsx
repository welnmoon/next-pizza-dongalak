"use client";

import { User } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const ProfileButton = () => {
  return (
    <Link href="/profile">
      <Button className="rounded-full bg-orange-100 border border-orange-200 text-orange-500 hover:bg-orange-500 hover:text-white">
        <User /> Профиль
      </Button>
    </Link>
  );
};

export default ProfileButton;
