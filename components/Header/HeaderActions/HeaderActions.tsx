import { CartDrawer } from "@/components/Cart/CartDrawer";
import ButtonCart from "../../Buttons/ButtonCart";
import ButtonMain from "../../Buttons/ButtonMain";

const HeaderActions = ({ hasCart = true }: { hasCart: boolean }) => {
  return (
    <div className="flex gap-2">
      <ButtonMain text="Войти" user={true} />

      {hasCart && <ButtonCart />}
    </div>
  );
};

export default HeaderActions;
