import HeaderActions from "./HeaderActions/HeaderActions";
import Logotype from "../Logotype/Logotype";
import HeaderSearch from "./HeaderActions/HeaderSearch";

const Header = () => {
  return (
    <header className="flex justify-between">
      <Logotype />
      <HeaderSearch />
      <HeaderActions />
    </header>
  );
};

export default Header;
