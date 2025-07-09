import { Ingredient, ProductItem } from "@prisma/client";
import { FaPen } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import VariantsItem from "./variants-item";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productItemSchema,
  ProductItemSchemaType,
} from "./addProductItemSchema";
import FormInput from "@/components/Form/FormInput";
import { FormSelect } from "@/components/Form/FormSelect";
import { PIZZA_TYPE_LABELS } from "@/prisma/constants";
import { FormSelectOptions } from "@/types/Form/FormSelect";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ProductWithIngredientsItemsCategories } from "@/types/admin/Products";

interface Props {
  variants: ProductItem[];
  selectedProduct: ProductWithIngredientsItemsCategories;
}
//TODO - Сделать иконки работающими

const ProductModalVariants = ({ variants, selectedProduct }: Props) => {
  const [addingProduct, setAddingProduct] = useState(false);
  const pizzaTypeOptions: FormSelectOptions[] = Object.entries(
    PIZZA_TYPE_LABELS
  ).map(([value, label]) => ({
    label,
    value: Number(value),
  }));
  const isPizza = selectedProduct.category.name.toLowerCase().includes("пицц");

  const form = useForm<ProductItemSchemaType>({
    resolver: zodResolver(productItemSchema),
    defaultValues: {
      pizzaType: "",
      price: "",
      size: "",
    },
  });

  const onSubmit = async (data: ProductItemSchemaType) => {
    try {
      const res = await fetch(`api/products/addItem/${selectedProduct.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw Error();
      }

      form.reset();
      toast.success("Вариант продукта создан");
    } catch (error) {
      toast.error("Ошибка при создании варианта");
      console.error("Ошибка запроса:", error);
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center">
        <h2 className="text-2xl text-medium">Варианты:</h2>
        <IoIosAdd
          onClick={() => setAddingProduct(true)}
          size={35}
          className="text-gray-500 cursor-pointer"
        />
        <FaPen className="text-gray-500 cursor-pointer" />
      </div>
      {addingProduct && (
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 p-4 border rounded"
          >
            {/* Всегда: цена */}
            <FormInput
              name="price"
              label="Цена (₸)"
              placeholder="Введите цену"
              type="number"
            />

            {/* Только для пиццы: размеры и тип теста */}
            {isPizza && (
              <>
                <FormInput
                  name="size"
                  label="Размер (см)"
                  placeholder="Введите диаметр"
                  type="number"
                />
                <FormSelect
                  name="pizzaType"
                  label="Тип теста"
                  placeholder="Выберите тесто"
                  options={pizzaTypeOptions}
                />
              </>
            )}

            <div className="flex gap-2">
              <Button type="submit">Создать вариант</Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setAddingProduct(false)}
              >
                Отменить
              </Button>
            </div>
          </form>
        </FormProvider>
      )}
      <div className="flex gap-2 flex-wrap">
        {variants.map((v) => (
          <VariantsItem variant={v} />
        ))}
      </div>
    </div>
  );
};

export default ProductModalVariants;
