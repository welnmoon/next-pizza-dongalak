"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { CategoryWithProducts } from "@/types/admin/Category";
import CategoryModal from "./category-modal";
import { FormProvider, useForm } from "react-hook-form";
import { categorySchema, CategorySchemaType } from "./categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import FormInput from "@/components/Form/FormInput";
import { Button } from "@/components/ui/button";

interface Props {
  categories: CategoryWithProducts[];
}

const Categories = ({ categories }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [categoriesList, setCategoriesList] =
    useState<CategoryWithProducts[]>(categories);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryWithProducts | null>(null);

  const updateCategories = (category: CategoryWithProducts) => {
    setCategoriesList((prevCategories) =>
      prevCategories.map((c) => (c.id === category.id ? category : c))
    );
    setSelectedCategory(category);
  };

  const handleOpenModal = ({
    category,
  }: {
    category: CategoryWithProducts;
  }) => {
    setOpenModal(true);
    setSelectedCategory(category);
  };

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CategorySchemaType) => {
    try {
      const res = await fetch(`/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw Error();
      }

      toast.success("Категория создана");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Категории</h2>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput
            name="name"
            placeholder="Название категории"
            label="Название категории"
          />
          <Button type="submit">
            {form.formState.isSubmitting
              ? "Сохранение..."
              : "Создать категорию"}
          </Button>
        </form>
      </FormProvider>

      <Table>
        <TableCaption>Список категорий и их продуктов</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Категория</TableHead>
            <TableHead>Количество продуктов</TableHead>
            <TableHead>Продукты</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoriesList.map((category) => (
            <TableRow
              key={category.id}
              className="cursor-pointer"
              onClick={() => handleOpenModal({ category })}
            >
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.products.length}</TableCell>
              <TableCell>
                <ul className="list-disc pl-4 space-y-1">
                  {category.products.map((product) => (
                    <li key={product.id}>
                      {product.name} ({product.items.length} варианта)
                    </li>
                  ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedCategory && (
        <CategoryModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          selectedCategory={selectedCategory!}
          updateCategories={updateCategories}
        />
      )}
    </div>
  );
};

export default Categories;
