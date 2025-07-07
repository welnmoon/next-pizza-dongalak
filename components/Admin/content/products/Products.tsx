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
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { ProductWithIngredientsItemsCategories } from "@/types/admin/Products";
import ProductModal from "./product-modal";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createRegularProductSchema,
  CreateRegularProductType,
} from "./addProductSchema";
import FormInput from "@/components/Form/FormInput";
import { FormSelect } from "@/components/Form/FormSelect";
import { FormSelectOptions } from "@/types/Form/FormSelect";

interface Props {
  products: ProductWithIngredientsItemsCategories[];
  categories: FormSelectOptions[];
}

const Products = ({ products, categories }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithIngredientsItemsCategories | null>(null);

  const handleOpenModal = (product: ProductWithIngredientsItemsCategories) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const form = useForm<CreateRegularProductType>({
    resolver: zodResolver(createRegularProductSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      imageUrl: "",
      categoryId: 1,
    },
  });

  const onSubmit = (product: CreateRegularProductType) => {
    console.log(product);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Продукты</h2>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput
            name="name"
            placeholder="Название продукта"
            label="Название продукта"
          />
          <FormInput
            name="imageUrl"
            placeholder="Ссылка на вашу картинку"
            label="Картинка продукта"
          />
          <FormSelect
            name="categoryId"
            options={categories}
            placeholder="Выберите категорию"
            label="Категория"
          />
        </form>
      </FormProvider>

      <Table>
        <TableCaption>Список продуктов</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Категория</TableHead>
            <TableHead>Ингредиенты</TableHead>
            <TableHead>Варианты</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.category?.name || "-"}</TableCell>
              <TableCell>
                {product.ingredients.length > 0 ? (
                  <ul className="list-disc pl-4 space-y-1">
                    {product.ingredients.map((ing) => (
                      <li key={ing.id}>{ing.name}</li>
                    ))}
                  </ul>
                ) : (
                  "-"
                )}
              </TableCell>
              {/*Variants*/}
              <TableCell>
                {product.items.length > 1 ? (
                  <ul className="space-y-1">
                    {product.items.map((item) => (
                      <li key={item.id}>
                        {item.size} см — {item.price.toLocaleString("ru-RU")} ₸
                      </li>
                    ))}
                  </ul>
                ) : (
                  "-"
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-center gap-2">
                  <FaPen
                    onClick={() => handleOpenModal(product)}
                    color="gray"
                    className="cursor-pointer"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ProductModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedProduct={selectedProduct!}
      />
    </div>
  );
};

export default Products;
