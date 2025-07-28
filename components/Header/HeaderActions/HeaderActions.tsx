import { Session } from "next-auth";
import ButtonCart from "../../Buttons/ButtonCart";
import ProfileButton from "../../Buttons/ProfileButton";
import { RiAdminFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeaderActions = ({
  hasCart = true,
  session,
}: {
  hasCart: boolean;
  session: Session;
}) => {
  return (
    <div className="flex gap-2">
      {session?.user.role === "ADMIN" && (
        <Link href="/admin">
          <Button className="rounded-full bg-gray-700 cursor-pointer">
            <RiAdminFill />
          </Button>
        </Link>
      )}
      <ProfileButton />

      {hasCart && <ButtonCart />}
    </div>
  );
};

export default HeaderActions;
