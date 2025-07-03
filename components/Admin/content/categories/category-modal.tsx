"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CategoryWithProducts } from "@/types/admin/Category";
import { PrintCategoryProducts } from "@/utils/admin/categories/print-category-products";
import { formatDate } from "@/utils/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { categorySchema, CategorySchemaType } from "./categorySchema";
import FormInput from "@/components/Checkout/Form/FormInput";
import { Button } from "@/components/ui/button";

interface Props {
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  selectedCategory: CategoryWithProducts;
  updateCategories: (category: CategoryWithProducts) => void;
}

const CategoryModal = ({
  openModal,
  setOpenModal,
  selectedCategory,
  updateCategories,
}: Props) => {
  if (!selectedCategory) return null;

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    defaultValues: {
      name: selectedCategory.name,
    },
  });
  const watched = form.watch();

  const isChanged = watched.name !== selectedCategory.name;

  const onSubmit = async (data: CategorySchemaType) => {
    setLoading(true);
    const res = await fetch(`/api/categories/${selectedCategory.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) [console.error("Ошибка при обновлении категории")];
    const updatedCategory: CategoryWithProducts = await res.json();
    updateCategories(updatedCategory);
    setLoading(false);
  };
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="w-[90%] h-[90%] mx-auto overflow-y-scroll px-10">
        <DialogHeader>
          <DialogTitle className="sticky top-0 bg-white p-2 shadow  rounded-md z-10">
            Подробнее о категории
          </DialogTitle>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput
                name="name"
                placeholder="Название категории"
                label="Категория"
              />
              <Button type="submit">
                {loading ? "...Сохраняем" : "Сохранить"}
              </Button>
            </form>
          </FormProvider>
          <p className="text-sm text-gray-500">
            Создан: {formatDate(selectedCategory?.createdAt ?? new Date())}
          </p>

          {/*Products*/}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl text-medium">Продукты:</h2>
            {PrintCategoryProducts({ selectedCategory })}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
