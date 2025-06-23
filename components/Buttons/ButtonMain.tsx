import { User } from "lucide-react";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import AuthModal from "../Modals/authModal/authModal";

interface Props {
  text: string;
  user?: boolean;
}

const ButtonMain = ({ text, user }: Props) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const session = useSession();
  return (
    <div>
      {session.status === "unauthenticated" && (
        <Button
          onClick={() => setOpenModal(true)}
          className="rounded-full bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          <User /> {text}
        </Button>
      )}
      {session.status === "authenticated" && (
        <Button className="rounded-full bg-orange-100 border border-orange-200 text-orange-500 hover:bg-orange-500 hover:text-white">
          <User /> Профиль
        </Button>
      )}
      {session.status === "loading" && (
        <Button className="rounded-full bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
          Загружаем...
        </Button>
      )}

      <AuthModal open={openModal} setOpen={setOpenModal} />
    </div>
  );
};

export default ButtonMain;
