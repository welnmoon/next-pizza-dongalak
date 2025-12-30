import { SearchIcon } from "lucide-react";

interface Props {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
}

const FilterSearch = ({ placeholder, value, onChange }: Props) => {
  return (
    <div className="relative w-full mb-4">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 w-3.5 h-3.5 sm:w-4 sm:h-4" />

      <input
        placeholder={placeholder}
        className="w-full bg-[#FFFCF7] border border-stone-200 pl-8 sm:pl-9 pr-3 py-2 text-xs sm:text-sm rounded-2xl outline-none focus:ring-2 focus:ring-emerald-600/20"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default FilterSearch;
