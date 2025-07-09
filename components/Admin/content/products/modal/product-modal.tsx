"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";

import { formatDate } from "@/utils/formatDate";
import { useSession } from "next-auth/react";
import { ProductWithIngredientsItemsCategories } from "@/types/admin/Products";
import ProductModalIngredients from "./ingredients";
import { FaPen } from "react-icons/fa";
import ProductModalVariants from "./variants";
import Warning from "@/components/Notifications/Warning";

interface Props {
  openModal: boolean;
  selectedProduct: ProductWithIngredientsItemsCategories;
  setOpenModal: (openModal: boolean) => void;
}
const ProductModal = ({ openModal, selectedProduct, setOpenModal }: Props) => {
  const session = useSession();
  const [loading, setLoading] = useState(false);

  if (!selectedProduct) {
    return null;
  } //TODO - Сделать иконки работающими

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogContent className="w-[90%] h-[90%] mx-auto overflow-y-scroll px-10">
        <DialogHeader>
          <DialogTitle className="sticky top-0 bg-white p-2 shadow  rounded-md z-10">
            Подробнее о продукте {selectedProduct.name}
          </DialogTitle>
          <p className="text-sm text-gray-500">
            Создан: {formatDate(selectedProduct?.createdAt ?? new Date())}
          </p>

          {/*--------------Категория----------------*/}
          <div className="flex gap-4 text-center items-center">
            <h2 className="text-2xl text-medium">Категория:</h2>
            <h2 className="bg-orange-200 text-orange-600 w-max px-3 rounded-lg">
              {selectedProduct.category.name}
            </h2>
            <FaPen color="gray" className=" cursor-pointer" /> {/*!!!*/}
          </div>
          {selectedProduct.items.length === 0 && (
            <Warning
              text="НЕ ВИДИТЕ ПРОДУКТ В МАГАЗИНЕ? СОЗДАЙТЕ ХОТЯ-БЫ ОДНУ ВАРИАЦИЮ
              ПРОДУКТА"
            />
          )}

          {/*--------------Ингредиенты----------------*/}

          {selectedProduct.ingredients.length > 0 && (
            <ProductModalIngredients
              ingredients={selectedProduct.ingredients}
            />
          )}

          {/*-------------Варианты-----------------*/}

          <ProductModalVariants
            selectedProduct={selectedProduct}
            variants={selectedProduct.items}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
