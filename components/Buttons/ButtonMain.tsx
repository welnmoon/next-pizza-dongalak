import { User } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  text: string;
  user?: boolean;
}

const ButtonMain = ({ text, user }: Props) => {
  return (
    <Button className="rounded-full bg-transparent border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
      {user ? <User /> : ""}
      {text}
    </Button>
  );
};

export default ButtonMain;
