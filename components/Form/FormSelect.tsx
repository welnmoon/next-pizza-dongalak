import { useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { FormSelectOptions } from "@/types/Form/FormSelect";

export const FormSelect = ({
  name,
  label,
  options,
  placeholder,
  required,
  className,
  disabled,
}: {
  name: string;
  label?: string;
  options: FormSelectOptions[];
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorText = errors[name]?.message as string;

  return (
    <div>
      {label && (
        <Label className="text-sm font-medium">
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <select
        disabled={disabled}
        {...register(name, { valueAsNumber: true })}
        className={cn(
          "w-full border px-3 py-2 rounded",
          errorText && "border-red-500",
          className
        )}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errorText && <p className="text-sm text-red-500 mt-1">{errorText}</p>}
    </div>
  );
};
