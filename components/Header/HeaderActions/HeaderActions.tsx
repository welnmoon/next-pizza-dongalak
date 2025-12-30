import { Session } from "next-auth";
import ButtonCart from "../../Buttons/ButtonCart";
import ProfileButton from "../../Buttons/ProfileButton";
import { RiAdminFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const HeaderActions = ({
  hasCart = true,
  session,
  className,
}: {
  hasCart: boolean;
  session: Session;
  className?: string;
}) => {
  return (
    <div className={cn("flex gap-2", className)}>
      {session?.user.role === "ADMIN" && (
        <Link href="/admin">
          <Button className="rounded-xl bg-stone-800 hover:bg-stone-900 cursor-pointer">
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
