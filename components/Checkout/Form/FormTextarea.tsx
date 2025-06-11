"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { ClearButton } from "./ClearButton";
import { Textarea } from "@/components/ui/textarea";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  className?: string;
}

const FormTextArea = ({
  name,
  label,
  required,
  placeholder,
  type,
  className,
}: Props) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div>
      {label && (
        <Label className="text-[14px] font-bold mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}

      <div className="relative">
        <Textarea
          {...register(name)}
          placeholder={placeholder}
          maxLength={200}
          className="max-h-[200px] w-full resize-none overflow-y-auto border-gray-100"
        />
        {value && <ClearButton onClick={onClear} />}
      </div>

      {errorText && (
        <p className="absolute text-sm text-red-500">{errorText}</p>
      )}
    </div>
  );
};

export default FormTextArea;
