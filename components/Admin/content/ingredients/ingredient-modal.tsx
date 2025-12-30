"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useEffect } from "react";

import { formatDate } from "@/utils/formatDate";
import { Ingredient } from "@prisma/client";
import { FormProvider, useForm } from "react-hook-form";
import { IngredientSchema, IngredientSchemaType } from "./ingredientSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

interface Props {
  openModal: boolean;
  selectedIngredient: Ingredient | null;
  setOpenModal: (openModal: boolean) => void;
}
const IngredientModal = ({
  openModal,
  selectedIngredient,
  setOpenModal,
}: Props) => {
  const form = useForm<IngredientSchemaType>({
    resolver: zodResolver(IngredientSchema),
    defaultValues: {
      name: selectedIngredient?.name ?? "",
    },
  });

  useEffect(() => {
    if (selectedIngredient) {
      form.reset({
        name: selectedIngredient.name,
      });
    }
  }, [selectedIngredient, form]);

  const watch = form.watch();
  const isChanged = watch.name !== selectedIngredient?.name;

  const onSubmit = async (ingredient: IngredientSchemaType) => {
    try {
      const res = await fetch(`/api/ingredients/${selectedIngredient?.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ingredient),
      });
      if (!res.ok) {
        throw Error();
      }

      toast.success("Ингредиент обновлен");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="w-[90%] h-[90%] mx-auto overflow-y-scroll px-10">
        <DialogHeader>
          <DialogTitle className="sticky top-0 bg-white p-2 shadow  rounded-md z-10">
            Подробнее о ингредиенте №{selectedIngredient?.id}
          </DialogTitle>
          <p className="text-sm text-stone-500">
            Создан: {formatDate(selectedIngredient?.createdAt ?? new Date())}
          </p>
          <p className="text-sm text-stone-500">
            Обновлен: {formatDate(selectedIngredient?.createdAt ?? new Date())}
          </p>
          <img
            src={selectedIngredient?.imageUrl}
            alt=""
            className="w-50 h-50"
          />
          <FormProvider {...form}>
            <form
              className="flex flex-col w-100 gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormInput
                name="name"
                label="Название"
                placeholder="Название ингредиента"
              />
              <Button disabled={!isChanged} type="submit">
                {form.formState.isSubmitting ? "Сохраняем..." : "Сохранить"}
              </Button>
            </form>
          </FormProvider>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default IngredientModal;
