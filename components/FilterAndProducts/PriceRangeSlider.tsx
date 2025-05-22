"use client";

import * as Slider from "@radix-ui/react-slider";
import { useState } from "react";
import PriceInput from "../Buttons/PriceInput";
import { usePriceFilterStore } from "@/store/priceFilterStore";

interface Props {
  priceFrom: number;
  priceTo: number;
}

const PriceRangeSlider = () => {
  // const [range, setRange] = useState<[number, number]>([1000, 5000]);
  const range = usePriceFilterStore((s) => s.priceRange);
  const setRange = usePriceFilterStore((s) => s.setPriceRange);

  const handleInputChange = (index: number, val: number) => {
    const newRange: [number, number] = [...range];
    newRange[index] = val;
    setRange(newRange);
  };

  return (
    <div className="w-full border-y py-6">
      <h2 className="font-semibold mb-2">Цена от и до:</h2>
      <div className="flex gap-4 mb-2">
        <PriceInput
          value={range[0]}
          onChange={(val) => handleInputChange(0, val)}
        />
        <PriceInput
          value={range[1]}
          onChange={(val) => handleInputChange(1, val)}
        />
      </div>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        min={0}
        max={10000}
        step={100}
        value={range}
        onValueChange={(val) => setRange([val[0], val[1]])}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
          <Slider.Range className="absolute bg-orange-500 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-5 h-5 bg-white border border-orange-500 rounded-full shadow hover:bg-orange-100" />
        <Slider.Thumb className="block w-5 h-5 bg-white border border-orange-500 rounded-full shadow hover:bg-orange-100" />
      </Slider.Root>
    </div>
  );
};

export default PriceRangeSlider;
