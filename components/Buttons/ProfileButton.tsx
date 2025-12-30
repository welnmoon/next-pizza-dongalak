"use client";

import { User } from "lucide-react";
import { Button } from "../ui/button";

import Link from "next/link";


const ProfileButton = () => {
  return (
    <Link href="/profile">
      <Button className="rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-700 hover:text-white">
        <User /> Профиль
      </Button>
    </Link>
  );
};

export default ProfileButton;
