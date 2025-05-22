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
    <div className="flex items-center w-[100px] px-3 py-2 bg-white border border-gray-100 focus:border-gray-500 rounded-xl ">
      <input
        type="number"
        className="w-full text-sm outline-none bg-transparent"
        placeholder="0"
        value={input}
        onChange={handleOnChange}
      />
      <span className="text-gray-400 text-sm">₸</span>
    </div>
  );
};

export default PriceInput;
