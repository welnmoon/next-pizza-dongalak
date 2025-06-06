import HeaderActions from "./HeaderActions/HeaderActions";
import Logotype from "../Logotype/Logotype";
import HeaderSearch from "./HeaderActions/HeaderSearch";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  hasSearch?: boolean;
  hasCart?: boolean;
}

const Header = ({ className, hasSearch = true, hasCart = true }: Props) => {
  return (
    <header className={cn("flex justify-between", className)}>
      <Logotype />
      {hasSearch ? <HeaderSearch /> : null}
      <HeaderActions hasCart={hasCart} />
    </header>
  );
};

export default Header;
