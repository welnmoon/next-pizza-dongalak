"use client";

import HeaderActions from "./HeaderActions/HeaderActions";
import Logotype from "../Logotype/Logotype";
import HeaderSearch from "./HeaderActions/HeaderSearch";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useHeaderVisibility } from "@/context/HeaderVisibilityContext";
import { Session } from "next-auth";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
  session: Session | null;
}

const Header = ({
  className,
  hasSearch = true,
  hasCart = true,
  session,
}: Props) => {
  const searchParams = useSearchParams();
  const { headerRef } = useHeaderVisibility();

  useEffect(() => {
    if (searchParams.has("paid")) {
      toast.success("Заказ успешно оплачен!");
    } else if (searchParams.has("notpaid")) {
      toast.error("Вы не оплатили заказ");
    }
  }, [searchParams]);
  return (
    <header
      ref={headerRef}
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      <Logotype />
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 sm:w-auto sm:flex-1 sm:justify-end">
        {hasSearch ? (
          <HeaderSearch className="w-full sm:flex-1 sm:min-w-[260px]" />
        ) : null}
        <HeaderActions
          hasCart={hasCart}
          session={session!}
          className="w-full sm:w-auto justify-end"
        />
      </div>
    </header>
  );
};

export default Header;
