"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";

import { formatDate } from "@/utils/formatDate";
import { ProductWithIngredientsItemsCategories } from "@/types/admin/Products";
import ProductModalIngredients from "./ingredients";
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
  const [variantsUpdated, setVariantsUpdated] = useState(false);
  const [ingredientsUpdated, setIngredientsUpdated] = useState(false);
  const [product, setProduct] =
    useState<ProductWithIngredientsItemsCategories>(selectedProduct);

  useEffect(() => {
    setProduct(selectedProduct);
  }, [selectedProduct]);

  useEffect(() => {
    if (!ingredientsUpdated && !variantsUpdated) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${selectedProduct.id}`, {
          cache: "no-cache",
        });
        const freshProduct = await res.json();
        setProduct(freshProduct); // Обновим состояние
      } catch (error) {
        console.error("Ошибка при обновлении продукта:", error);
      } finally {
        setIngredientsUpdated(false);
        setVariantsUpdated(false);
      }
    };

    fetchProduct();
  }, [ingredientsUpdated, variantsUpdated, selectedProduct.id]);

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
          <p className="text-sm text-stone-500">
            Создан: {formatDate(product?.createdAt ?? new Date())}
          </p>

          <div>
            <img className="w-50 h-50" src={selectedProduct.imageUrl} alt="" />
          </div>

          {/*--------------Категория----------------*/}
          <div className="flex gap-4 text-center items-center">
            <h2 className="text-2xl text-medium">Категория:</h2>
            <h2 className="bg-emerald-200 text-emerald-700 w-max px-3 rounded-lg">
              {product.category?.name}
            </h2>
          </div>
          {product.items.length === 0 && (
            <Warning
              text="НЕ ВИДИТЕ ПРОДУКТ В МАГАЗИНЕ? СОЗДАЙТЕ ХОТЯ-БЫ ОДНУ ВАРИАЦИЮ
              ПРОДУКТА"
            />
          )}

          {/*--------------Ингредиенты----------------*/}

          <ProductModalIngredients
            selectedProductId={product.id}
            allIngredients={allIngredients}
            ingredients={product.ingredients}
            setIngredientsUpdated={setIngredientsUpdated}
          />

          {/*-------------Варианты-----------------*/}

          <ProductModalVariants
            selectedProduct={product}
            variants={product.items}
            setVariantsUpdated={setVariantsUpdated}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
