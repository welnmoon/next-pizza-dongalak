import { User } from "lucide-react";
import { Button } from "../ui/button";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import AuthModal from "../Modals/authModal/authModal";
import Link from "next/link";

interface Props {
  text: string;
}

const ProfileButton = ({ text }: Props) => {
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
        <Link href={`/profile`}>
          <Button className="rounded-full bg-orange-100 border border-orange-200 text-orange-500 hover:bg-orange-500 hover:text-white">
            <User /> Профиль
          </Button>
        </Link>
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

export default ProfileButton;
