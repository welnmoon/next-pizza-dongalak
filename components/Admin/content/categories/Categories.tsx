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
import { CategoryWithProducts } from "@/types/admin/Category";
import CategoryModal from "./category-modal";

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
  };

  const handleOpenModal = ({
    category,
  }: {
    category: CategoryWithProducts;
  }) => {
    setOpenModal(true);
    setSelectedCategory(category);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Заказы</h2>

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

      <CategoryModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        selectedCategory={selectedCategory!}
        updateCategories={updateCategories}
      />
    </div>
  );
};

export default Categories;
