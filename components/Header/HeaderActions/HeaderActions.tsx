import ButtonCart from "../../Buttons/ButtonCart";
import ButtonMain from "../../Buttons/ButtonMain";

const HeaderActions = () => {
  return (
    <div className="flex gap-2">
      <ButtonMain text="Войти" user={true} />
      <ButtonCart />
    </div>
  );
};

export default HeaderActions;
