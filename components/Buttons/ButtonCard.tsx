import { User } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  text: string;
}

const ButtonCard = ({ text }: Props) => {
  return (
    <Button className="rounded-full  border border-orange-400 text-orange-500 bg-orange-200 hover:bg-orange-500 hover:text-white">
      {text}
    </Button>
  );
};

export default ButtonCard;
