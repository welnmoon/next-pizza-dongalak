"use client";

import { Ingredient } from "@prisma/client";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IngredientModal from "./ingredient-modal";
import { useState } from "react";

interface Props {
  ingredients: Ingredient[];
}

const Ingredients = ({ ingredients }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState<Ingredient>();

  const handleOpenModal = (ingredient: Ingredient) => {
    setSelectedIngredient(ingredient);
    setOpenModal(true);
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Ингредиенты</h2>

      <Table>
        <TableCaption>Список ингредиентов</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Создан</TableHead>
            <TableHead>Обновлён</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ingredients.map((ingredient) => (
            <TableRow key={ingredient.id}>
              <TableCell>{ingredient.id}</TableCell>
              <TableCell className="font-medium">{ingredient.name}</TableCell>
              <TableCell>
                {new Date(ingredient.createdAt).toLocaleDateString("ru-RU")}
              </TableCell>
              <TableCell>
                {new Date(ingredient.updatedAt).toLocaleDateString("ru-RU")}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end items-center gap-2">
                  <FaPen
                    onClick={() => handleOpenModal(ingredient)}
                    className="cursor-pointer"
                  />
                  <MdDelete
                    onClick={() => console.log("Удалить", ingredient.id)}
                    className="cursor-pointer"
                    color="red"
                    size={17}
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <IngredientModal
        openModal={openModal}
        selectedIngredient={selectedIngredient!}
        setOpenModal={setOpenModal}
      />
    </div>
  );
};

export default Ingredients;
