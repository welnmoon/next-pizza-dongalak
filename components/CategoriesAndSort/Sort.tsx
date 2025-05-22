import { ArrowUpDown } from "lucide-react";

const Sort = () => {
  return (
    <div className="bg-gray-50 inline-block rounded-md p-2">
      <div className="flex gap-1 items-center h-full font-medium">
        <ArrowUpDown size={16} />
        <p>Сортировка:</p>
        <p className="font-semibold text-orange-500">рейтингу</p>
      </div>
    </div>
  );
};

export default Sort;
