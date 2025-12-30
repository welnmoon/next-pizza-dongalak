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
      className="group flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-xs sm:text-sm text-emerald-800 font-semibold transition-all hover:bg-emerald-100 active:scale-95"
    >
      <PlusIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:rotate-90" />
      <span>{text}</span>
    </Button>
  );
};

export default ButtonCard;
