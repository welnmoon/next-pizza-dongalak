"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";

import { formatDate } from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import { ProductWithIngredientsItemsCategories } from "@/types/admin/Products";
import ProductModalIngredients from "./ingredients";
import { FaPen } from "react-icons/fa";
import ProductModalVariants from "./variants";
import Warning from "@/components/Notifications/Warning";
import { Ingredient } from "@prisma/client";

interface Props {
  openModal: boolean;
  selectedProduct: ProductWithIngredientsItemsCategories;
  setOpenModal: (openModal: boolean) => void;
  allIngredients: Ingredient[];
}
const ProductModal = ({
  openModal,
  selectedProduct,
  setOpenModal,
  allIngredients,
}: Props) => {
  const session = useSession();
  const [ingredientsUpdated, setIngredientsUpdated] = useState(false);
  const [product, setProduct] =
    useState<ProductWithIngredientsItemsCategories>();

  useEffect(() => {
    if (!ingredientsUpdated) return;

    const fetchProduct = async () => {
      const res = await fetch(`/api/admin/products/${selectedProduct.id}`);
      const freshProduct = await res.json();
      setProduct(freshProduct);
      setIngredientsUpdated(false);
    };
    fetchProduct();
  }, [ingredientsUpdated]);

  if (!product) {
    return null;
  } //TODO - Сделать иконки работающими

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="w-[90%] h-[90%] mx-auto overflow-y-scroll px-10">
        <DialogHeader>
          <DialogTitle className="sticky top-0 bg-white p-2 shadow  rounded-md z-10">
            Подробнее о продукте {product.name}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Создан: {formatDate(product?.createdAt ?? new Date())}
          </p>

          {/*--------------Категория----------------*/}
          <div className="flex gap-4 text-center items-center">
            <h2 className="text-2xl text-medium">Категория:</h2>
            <h2 className="bg-orange-200 text-orange-600 w-max px-3 rounded-lg">
              {product.category.name}
            </h2>
            <FaPen color="gray" className=" cursor-pointer" /> {/*!!!*/}
          </div>
          {product.items.length === 0 && (
            <Warning
              text="НЕ ВИДИТЕ ПРОДУКТ В МАГАЗИНЕ? СОЗДАЙТЕ ХОТЯ-БЫ ОДНУ ВАРИАЦИЮ
              ПРОДУКТА"
            />
          )}

          {/*--------------Ингредиенты----------------*/}

          {product.ingredients.length > 0 && (
            <ProductModalIngredients
              selectedProductId={product.id}
              allIngredients={allIngredients}
              ingredients={product.ingredients}
              setIngredientsUpdated={setIngredientsUpdated}
            />
          )}

          {/*-------------Варианты-----------------*/}

          <ProductModalVariants
            selectedProduct={product}
            variants={product.items}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
