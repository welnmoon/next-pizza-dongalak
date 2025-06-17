'use client'

import HeaderActions from "./HeaderActions/HeaderActions";
import Logotype from "../Logotype/Logotype";
import HeaderSearch from "./HeaderActions/HeaderSearch";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

const Header = ({ className, hasSearch = true, hasCart = true }: Props) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.has("paid")) {
      toast.success("Заказ успешно оплачен!");
    }
  }, []);
  return (
    <header className={cn("flex justify-between", className)}>
      <Logotype />
      {hasSearch ? <HeaderSearch /> : null}
      <HeaderActions hasCart={hasCart} />
    </header>
  );
};

export default Header;
