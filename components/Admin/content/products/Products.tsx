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
import { useEffect, useState } from "react";
import { ProductWithIngredientsItemsCategories } from "@/types/admin/Products";
import ProductModal from "./modal/product-modal";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createRegularProductSchema,
  CreateRegularProductType,
} from "./addProductSchema";
import FormInput from "@/components/Form/FormInput";
import { FormSelect } from "@/components/Form/FormSelect";
import { FormSelectOptions } from "@/types/Form/FormSelect";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import UploadForm from "../upload/UploadForm";
import { Ingredient } from "@prisma/client";

interface Props {
  products: ProductWithIngredientsItemsCategories[];
  categories: FormSelectOptions[];
  allIngredients: Ingredient[];
}

const Products = ({ products, categories, allIngredients }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductWithIngredientsItemsCategories | null>(null);
  const [uploadedImgUrl, setUploadedImgUrl] = useState("");
  const [resetUploadForm, setResetUploadForm] = useState(false);

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

  useEffect(() => {
    form.setValue("imageUrl", uploadedImgUrl);
  }, [uploadedImgUrl, form]);

  const onSubmit = async (product: CreateRegularProductType) => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Ошибка при создании:", error.message);
        toast.error("Ошибка при создании продукта");
        return;
      }

      const data = await res.json();
      console.log("Создан продукт:", data);

      form.reset();
      setResetUploadForm(true);

      toast.success(`Продукт ${data.name} успешно создан`);
    } catch (err) {
      console.error("Ошибка запроса:", err);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Продукты</h2>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormInput
            name="name"
            placeholder="Название продукта"
            label="Название продукта"
          />
          {/* <FormInput
            name="imageUrl"
            placeholder="Ссылка на вашу картинку"
            label="Картинка продукта"
          /> */}
          <UploadForm
            resetUploadForm={resetUploadForm}
            onUpload={(url) => {
              form.setValue("imageUrl", url, { shouldValidate: true }); // 👈 сразу сюда
              setUploadedImgUrl(url);
            }}
          />
          <FormSelect
            name="categoryId"
            options={categories}
            placeholder="Выберите категорию"
            label="Категория"
          />
          <Button type="submit">
            {form.formState.isSubmitting ? "Создание..." : "Создать"}
          </Button>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow
              className="cursor-pointer"
              onClick={() => handleOpenModal(product)}
              key={product.id}
            >
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
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <ProductModal
        allIngredients={allIngredients}
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedProduct={selectedProduct!}
      />
    </div>
  );
};

export default Products;
