"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CategoryWithProducts } from "@/types/admin/Category";
import { PrintCategoryProducts } from "@/utils/admin/categories/print-category-products";
import { formatDate } from "@/utils/formatDate";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { categorySchema, CategorySchemaType } from "./categorySchema";
import FormInput from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import Warning from "@/components/Notifications/Warning";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    defaultValues: {
      name: selectedCategory.name,
    },
  });

  useEffect(() => {
    if (selectedCategory) {
      form.reset({ name: selectedCategory.name });
    }
  }, [selectedCategory, form]);

  if (!selectedCategory) return null;

  const onSubmit = async (data: CategorySchemaType) => {
    setLoading(true);
    const res = await fetch(`/api/categories/${selectedCategory.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) console.error("Ошибка при обновлении категории");
    const updatedCategory: CategoryWithProducts = await res.json();
    updateCategories(updatedCategory);
    toast.success(`Категория обновлена на ${updatedCategory.name}`);
    setLoading(false);
  };

  const onDeleteCategory = async (id: number) => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw Error();
      }
      setDeleting(false);
      toast.success("Категория удалена");
      setOpenModal(false);
      // updateCategories({ ...selectedCategory, id: 0, name: "" });
    } catch (error) {
      setDeleting(false);
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(error);
      }
      toast.error("Категория не удалена");
    }
  };
  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="w-[90%] h-[90%] mx-auto overflow-y-scroll px-10">
        <DialogHeader>
          <DialogTitle className="sticky top-0 bg-white p-2 shadow  rounded-md z-10">
            Подробнее о категории
          </DialogTitle>
          {selectedCategory.id === 1 ? (
            <Warning text="Увы, но вы не можете менять данную категорию" />
          ) : (
            <div>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormInput
                    name="name"
                    placeholder="Название категории"
                    label="Категория"
                    className="mb-2"
                  />
                  <Button className="bg-gray-500" type="submit">
                    {loading ? "...Сохраняем" : "Сохранить"}
                  </Button>
                </form>
              </FormProvider>
              <Button
                className="bg-red-500"
                onClick={() => onDeleteCategory(selectedCategory.id)}
              >
                {deleting ? "...Удаляем" : "Удалить категорию"}
              </Button>
            </div>
          )}

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
