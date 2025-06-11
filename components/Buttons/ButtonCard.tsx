import { PlusIcon, User } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  text: string;
  onClick: () => void;
}

const ButtonCard = ({ text, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      className="rounded-full font-medium text-orange-600 bg-orange-100 hover:bg-orange-200"
    >
      <PlusIcon />
      {text}
    </Button>
  );
};

export default ButtonCard;
