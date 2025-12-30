"use client";

import { useEffect, useState } from "react";

interface Props {
  value: number;
  onChange: (value: number) => void;
}

const PriceInput = ({ value, onChange }: Props) => {
  const [input, setInput] = useState(value);

  useEffect(() => {
    setInput(value);
  }, [value]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = Number(e.target.value);
    setInput(num);
    onChange(num);
  };
  return (
    <div className="flex items-center w-[90px] sm:w-[100px] px-3 py-2 bg-[#FFFCF7] border border-stone-200 rounded-2xl focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-600/20">
      <input
        type="number"
        className="w-full text-xs sm:text-sm outline-none bg-transparent"
        placeholder="0"
        value={input}
        onChange={handleOnChange}
      />
      <span className="text-stone-400 text-xs sm:text-sm">₸</span>
    </div>
  );
};

export default PriceInput;
