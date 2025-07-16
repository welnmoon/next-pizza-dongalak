import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  text: string;
  onClick: () => void;
}

const ButtonCard = ({ text, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      className=" group flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 text-orange-600 font-semibold transition-all hover:bg-orange-200 active:scale-95"
    >
      <PlusIcon className="w-4 h-4 transition-transform group-hover:rotate-90" />
      <span>{text}</span>
    </Button>
  );
};

export default ButtonCard;
