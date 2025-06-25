import ButtonCart from "../../Buttons/ButtonCart";
import ProfileButton from "../../Buttons/ProfileButton";

const HeaderActions = ({ hasCart = true }: { hasCart: boolean }) => {
  return (
    <div className="flex gap-2">
      <ProfileButton text="Войти" user={true} />

      {hasCart && <ButtonCart />}
    </div>
  );
};

export default HeaderActions;
