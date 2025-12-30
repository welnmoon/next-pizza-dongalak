"use client";

import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  label: string;
  checked: boolean;
  onChange: (id: number) => void;
  id: number;
}

export function CheckboxItem({ label, checked, onChange, id }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={label} checked={checked} onClick={() => onChange(id)} />
      <label
        htmlFor={label}
        className="text-xs sm:text-sm font-medium leading-none cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
}
