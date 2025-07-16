import { ProductItem } from "@prisma/client";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productItemSchema,
  ProductItemSchemaType,
} from "./addProductItemSchema";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/Form/FormInput";
import { FormSelect } from "@/components/Form/FormSelect";
import { PIZZA_SIZES, PIZZA_TYPE_LABELS } from "@/prisma/constants";
import { toast } from "react-hot-toast";

const pizzaTypeOptions = Object.entries(PIZZA_TYPE_LABELS).map(
  ([value, label]) => ({
    label,
    value: Number(value),
  })
);
const pizzaSizeOptions = PIZZA_SIZES.map((size) => ({
  label: `${size} см`,
  value: size,
}));

export default function EditableVariantItem({
  variant,
  isPizza,
  productId,
  setVariantsUpdated,
}: {
  variant: ProductItem;
  isPizza: boolean;
  productId: number;
  setVariantsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useForm<ProductItemSchemaType>({
    resolver: zodResolver(productItemSchema),
    defaultValues: {
      price: variant.price.toString(),
      size: variant.size || 20,
      pizzaType: variant.pizzaType || 1,
    },
  });

  const onSubmit = async (data: ProductItemSchemaType) => {
    try {
      const res = await fetch(`/api/products/item/${variant.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          productId, // <-- обязательно передавай productId!
          price: Number(data.price),
          size: data.size ? Number(data.size) : null,
          pizzaType: data.pizzaType ? Number(data.pizzaType) : null,
        }),
      });

      if (res.status === 409) {
        const err = await res.json();
        toast.error(err.message || "Такой вариант уже существует");
        return;
      }

      if (!res.ok) throw Error();
      toast.success("Вариант обновлён");
      setVariantsUpdated(true);
    } catch (error) {
      toast.error(
        "Ошибка при обновлении: " +
          (error instanceof Error ? error.message : "Неизвестная ошибка")
      );
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-gray-100 px-4 py-2 rounded-lg flex items-center gap-4 w-max"
      >
        <FormInput name="price" placeholder="Цена" className="w-24 bg-white" />
        {isPizza && (
          <>
            <FormSelect
              name="size"
              options={pizzaSizeOptions}
              placeholder="Размер"
              className="w-28 bg-white"
            />
            <FormSelect
              name="pizzaType"
              options={pizzaTypeOptions}
              placeholder="Тесто"
              className="w-32 bg-white"
            />
          </>
        )}
        <Button
          type="submit"
          size="sm"
          variant="secondary"
          className="bg-white cursor-pointer"
        >
          {form.formState.isSubmitting ? "Сохраняем..." : "Сохранить"}
        </Button>
      </form>
    </FormProvider>
  );
}
