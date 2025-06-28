"use client";

import HeaderActions from "./HeaderActions/HeaderActions";
import Logotype from "../Logotype/Logotype";
import HeaderSearch from "./HeaderActions/HeaderSearch";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useHeaderVisibility } from "@/context/HeaderVisibilityContext";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

const Header = ({ className, hasSearch = true, hasCart = true }: Props) => {
  const searchParams = useSearchParams();
  const { headerRef } = useHeaderVisibility();

  useEffect(() => {
    if (searchParams.has("paid")) {
      toast.success("Заказ успешно оплачен!");
    } else if (searchParams.has("notpaid")) {
      toast.error("Вы не оплатили заказ");
    }
  }, []);
  return (
    <header ref={headerRef} className={cn("flex justify-between", className)}>
      <Logotype />
      {hasSearch ? <HeaderSearch /> : null}
      <HeaderActions hasCart={hasCart} />
    </header>
  );
};

export default Header;
