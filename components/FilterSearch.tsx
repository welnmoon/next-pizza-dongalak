import { SearchIcon } from "lucide-react";

interface Props {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
}

const FilterSearch = ({ placeholder, value, onChange }: Props) => {
  return (
    <div className="relative w-full mb-4 ">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />

      <input
        placeholder={placeholder}
        className="w-full bg-gray-50 pl-9 pr-3 py-2 text-sm rounded-xl outline-none focus:border-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default FilterSearch;
